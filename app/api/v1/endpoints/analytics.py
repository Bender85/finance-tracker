from datetime import date, datetime

from fastapi import APIRouter
from sqlalchemy import func
from sqlmodel import select

from app.api.deps import CurrentUserDep, SessionDep
from app.models.budget import CategoryBudget  # Переконайся, що імпортував
from app.models.transaction import Transaction
from app.schemas.analytics import AnalyticsResponse, CategoryAggregation

router = APIRouter(tags=["Analytics"])

@router.get("/categories", response_model=AnalyticsResponse)
async def get_spent_by_categories(
    session: SessionDep,
    current_user: CurrentUserDep,
    from_date: date | None = None,  # Опціональний фільтр: дата "від"
    to_date: date | None = None     # Опціональний фільтр: дата "до"
):
    """
    Повертає аналітику витрат користувача за категоріями за вказаний період.
    Якщо період не вказано, автоматично показує дані за поточний календарний місяць.
    """
    # 1. Якщо дати не передані, вираховуємо межі поточного місяця
    if not from_date:
        # Беремо перший день поточного року та місяця (наприклад, 2026-10-01)
        from_date = date(datetime.utcnow().year, datetime.utcnow().month, 1)
    
    if not to_date:
        # Кінцева межа — сьогоднішній день
        to_date = datetime.utcnow().date()

    # 2. Конвертуємо тип date у datetime для точного порівняння в БД (з урахуванням годин)
    # Початок дня відліку (00:00:00)
    start_datetime = datetime.combine(from_date, datetime.min.time())
    # Кінець дня відліку (23:59:59)
    end_datetime = datetime.combine(to_date, datetime.max.time())

    # 3. Будуємо SQL-запит із фільтрацією за часовим проміжком
    statement = (
        select(
            Transaction.category_name,
            func.sum(Transaction.amount).label("total")
        )
        .where(
            Transaction.user_id == current_user.id,
            Transaction.type == "EXPENSE",
            Transaction.date >= start_datetime, # Фільтр: транзакція створена після або в start_datetime
            Transaction.date <= end_datetime    # Фільтр: транзакція створена до або в end_datetime
        )
        .group_by(Transaction.category_name)
    )
    
    result = await session.execute(statement)
    rows = result.all()
    
    # --- НАШ НОВИЙ БЛОК: ІНТЕГРАЦІЯ БЮДЖЕТНИХ ЛІМІТІВ ---
    # 1. Витягуємо всі ліміти цього користувача з бази даних
    budget_statement = select(CategoryBudget).where(CategoryBudget.user_id == current_user.id)
    budget_result = await session.execute(budget_statement)
    budgets = budget_result.scalars().all()
    
    # Створюємо швидкий словник для мапінгу: {назва_категорії: ліміт}
    budget_map = {b.category_name: b.amount_limit for b in budgets}
    # --------------------------------------------------

    # 4. Формуємо відповідь
    by_categories = []
    total_spent = 0
    
    for row in rows:
        category_name, total_amount = row
        
        # Отримуємо ліміт для цієї категорії (якщо немає — ставимо 0.0)
        limit = budget_map.get(category_name, 0.0)
        
        # Перевіряємо перевищення: якщо ліміт задано (> 0) і поточні витрати більші або дорівнюють йому
        is_exceeded = limit > 0 and float(total_amount) >= limit
        
        by_categories.append(
            CategoryAggregation(
                category_name=category_name, 
                total_amount=total_amount,
                amount_limit=limit,        # <-- Переконайся, що ці два поля є у твоїй схемі CategoryAggregation
                is_exceeded=is_exceeded    # <-- Переконайся, що ці два поля є у твоїй схемі CategoryAggregation
            )
        )
        total_spent += total_amount
        
    return AnalyticsResponse(
        total_spent=total_spent,
        by_categories=by_categories
    )
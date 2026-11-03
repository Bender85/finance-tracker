from pydantic import BaseModel
from typing import Optional
from uuid import UUID
import csv
import io

from fastapi import APIRouter, HTTPException, status, Depends, Query
from fastapi.responses import StreamingResponse
from sqlmodel import select

from app.api.deps import CurrentUserDep, SessionDep
from app.models.account import Account
from app.models.transaction import Transaction
from app.schemas.transaction import (
    TransactionCreate,
    TransactionResponse,
    TransactionType,
    TransactionUpdate,
)
from app.models.budget import CategoryBudget # Імпортуй нову модель

class BudgetCreate(BaseModel):
    category_name: str
    amount_limit: float

router = APIRouter(tags=["Transactions"])

@router.post("/budget", status_code=201)
async def set_category_budget(
    payload: BudgetCreate,
    session: SessionDep,
    current_user: CurrentUserDep
):
    """Встановлює або оновлює місячний ліміт витрат для категорії"""
    # Перевіряємо, чи вже існує ліміт для цієї категорії у поточного юзера
    statement = select(CategoryBudget).where(
        CategoryBudget.user_id == current_user.id,
        CategoryBudget.category_name == payload.category_name
    )
    result = await session.execute(statement)
    budget = result.scalar_one_or_none()

    if budget:
        # Якщо є — оновлюємо
        budget.amount_limit = payload.amount_limit
    else:
        # Якщо немає — створюємо новий
        budget = CategoryBudget(
            user_id=current_user.id,
            category_name=payload.category_name,
            amount_limit=payload.amount_limit
        )
        session.add(budget)

    await session.commit()
    await session.refresh(budget)
    return budget


@router.post("/", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
async def create_transaction(
    transaction_data: TransactionCreate,
    session: SessionDep,
    current_user: CurrentUserDep
):
    """Створює транзакцію та автоматично оновлює баланс рахунку"""
    statement = select(Account).where(
        Account.id == transaction_data.account_id, 
        Account.user_id == current_user.id
    )
    result = await session.execute(statement)
    account = result.scalar_one_or_none()
    
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Рахунок не знайдено або він вам не належить"
        )
    
    if transaction_data.type == TransactionType.INCOME:
        account.balance += transaction_data.amount
    elif transaction_data.type == TransactionType.EXPENSE:
        if account.balance < transaction_data.amount:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Недостатньо коштів. Поточний баланс: {account.balance} {account.currency}"
            )
        account.balance -= transaction_data.amount

    new_transaction = Transaction(
        amount=transaction_data.amount,
        type=transaction_data.type,
        category_name=transaction_data.category_name,
        description=transaction_data.description or "",
        user_id=current_user.id,
        account_id=transaction_data.account_id
    )
    
    session.add(new_transaction)
    session.add(account)
    await session.commit()
    await session.refresh(new_transaction)
    return new_transaction

@router.get("/", response_model=list[TransactionResponse])
async def read_transactions(
    session: SessionDep,
    current_user: CurrentUserDep,
    account_id: Optional[UUID] = Query(None, description="Фільтр за конкретним рахунком"),
    category_name: Optional[str] = Query(None, description="Фільтр за назвою категорії")
):
    """Повертає список транзакцій користувача з опціональною фільтрацією"""
    # Базовий запит: тільки транзакції поточного юзера
    statement = select(Transaction).where(Transaction.user_id == current_user.id)
    
    # Динамічно додаємо фільтри, якщо вони передані з фронтенду
    if account_id is not None:
        statement = statement.where(Transaction.account_id == account_id)
    if category_name is not None:
        statement = statement.where(Transaction.category_name == category_name)
        
    # Сортуємо від найновіших до найстаріших
    statement = statement.order_by(Transaction.date.desc())
    
    result = await session.execute(statement)
    transactions = result.scalars().all()
    return transactions

@router.patch("/{transaction_id}", response_model=TransactionResponse)
async def update_transaction(
    transaction_id: UUID,
    update_data: TransactionUpdate,
    session: SessionDep,
    current_user: CurrentUserDep
):
    """Оновлює транзакцію та коректно перераховує баланс рахунку"""
    # 1. Шукаємо транзакцію
    tx_statement = select(Transaction).where(Transaction.id == transaction_id, Transaction.user_id == current_user.id)
    tx_result = await session.execute(tx_statement)
    transaction = tx_result.scalar_one_or_none()
    
    if not transaction:
        raise HTTPException(status_code=404, detail="Транзакцію не знайдено")
        
    # 2. Шукаємо рахунок, до якого вона прив'язана
    account = await session.get(Account, transaction.account_id)
    
    # 3. КРОК ВІДКОТУ: Повертаємо баланс рахунку у початковий стан (скасовуємо стару дію)
    if transaction.type == "INCOME":
        account.balance -= transaction.amount
    elif transaction.type == "EXPENSE":
        account.balance += transaction.amount

    # 4. Оновлюємо поля транзакції новими даними, якщо вони передані
    update_dict = update_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(transaction, key, value)

    # 5. КРОК ЗАСТОСУВАННЯ: Накочуємо нову дію на баланс рахунку
    if transaction.type == "INCOME":
        account.balance += transaction.amount
    elif transaction.type == "EXPENSE":
        if account.balance < transaction.amount:
            raise HTTPException(status_code=400, detail="Недостатньо коштів для такого оновлення транзакції")
        account.balance -= transaction.amount

    session.add(transaction)
    session.add(account)
    await session.commit()
    await session.refresh(transaction)
    return transaction


@router.delete("/{transaction_id}", status_code=status.HTTP_200_OK)
async def delete_transaction(
    transaction_id: UUID,
    session: SessionDep,
    current_user: CurrentUserDep
):
    """Видаляє транзакцію та повертає кошти назад на баланс рахунку"""
    tx_statement = select(Transaction).where(Transaction.id == transaction_id, Transaction.user_id == current_user.id)
    tx_result = await session.execute(tx_statement)
    transaction = tx_result.scalar_one_or_none()
    
    if not transaction:
        raise HTTPException(status_code=404, detail="Транзакцію не знайдено")
        
    account = await session.get(Account, transaction.account_id)
    
    # Повертаємо гроші на рахунок перед видаленням запису
    if transaction.type == "INCOME":
        account.balance -= transaction.amount
    elif transaction.type == "EXPENSE":
        account.balance += transaction.amount

    session.add(account)
    await session.delete(transaction)
    await session.commit()
    
    return {"message": "Транзакцію успішно видалено, баланс рахунку відновлено"}


@router.get("/export", response_class=StreamingResponse)
async def export_transactions_to_csv(
    session: SessionDep,
    current_user: CurrentUserDep,
    account_id: Optional[UUID] = Query(None),
    category_name: Optional[str] = Query(None)
):
    """
    Генерує та віддає CSV-файл із транзакціями користувача 
    з урахуванням поточних фільтрів екрану.
    """
    # 1. Формуємо запит до бази даних (ідентично до звичайного GET)
    statement = select(Transaction).where(Transaction.user_id == current_user.id)
    if account_id is not None:
        statement = statement.where(Transaction.account_id == account_id)
    if category_name is not None:
        statement = statement.where(Transaction.category_name == category_name)
    
    statement = statement.order_by(Transaction.date.desc())
    result = await session.execute(statement)
    transactions = result.scalars().all()

    # 2. Створюємо ін-меморі текстовий потік для запису CSV даних
    output = io.StringIO()
    writer = csv.writer(output, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

    # Записуємо заголовки колонок таблиці звітів
    writer.writerow(["ID", "Date", "Type", "Amount", "Category", "Description"])

    # Записуємо рядки з транзакціями
    for tx in transactions:
        writer.writerow([
            str(tx.id),
            tx.date.strftime("%Y-%m-%d %H:%M:%S") if hasattr(tx.date, "strftime") else str(tx.date),
            tx.type,
            f"{tx.amount:.2f}",
            tx.category_name or "",
            tx.description or ""
        ])

    # Повертаємо покажчик потоку на початок файлу
    output.seek(0)

    # 3. Формуємо стрімінгову відповідь файлу з правильними заголовками для браузера
    headers = {
        'Content-Disposition': 'attachment; filename="financial_report.csv"',
        'Content-Type': 'text/csv; charset=utf-8'
    }
    
    return StreamingResponse(iter([output.getvalue()]), headers=headers)
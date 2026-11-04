from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from sqlmodel import select

from app.api.deps import CurrentUserDep, SessionDep
from app.models.account import Account
from app.models.transaction import Transaction
from app.schemas.account import AccountCreate, AccountResponse, AccountTransfer

router = APIRouter(tags=["Accounts"])

class AccountUpdate(BaseModel):
    name: str | None = Field(None, max_length=50)
    balance: float | None = Field(None, ge=0)

@router.post("/", response_model=AccountResponse, status_code=status.HTTP_201_CREATED)
async def create_account(
    account_data: AccountCreate,
    session: SessionDep,
    current_user: CurrentUserDep
):
    """Створює новий фінансовий рахунок для поточного користувача"""
    new_account = Account(
        name=account_data.name,
        currency=account_data.currency.upper(),
        balance=account_data.balance,
        user_id=current_user.id
    )
    session.add(new_account)
    await session.commit()
    await session.refresh(new_account)
    return new_account

@router.get("/", response_model=list[AccountResponse])
async def get_accounts(
    session: SessionDep,
    current_user: CurrentUserDep
):
    """Повертає список усіх рахунків поточного користувача"""
    statement = select(Account).where(Account.user_id == current_user.id)
    result = await session.execute(statement)
    accounts = result.scalars().all()
    return accounts

@router.post("/transfer", status_code=status.HTTP_200_OK)
async def transfer_funds(
    transfer_data: AccountTransfer,
    session: SessionDep,
    current_user: CurrentUserDep
):
    """Здійснює переказ коштів між двома рахунками користувача"""
    if transfer_data.from_account_id == transfer_data.to_account_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Рахунок-відправник та рахунок-отримувач не можуть бути однаковими"
        )

    # 1. Завантажуємо обидва рахунки та перевіряємо, чи належать вони поточному юзеру
    stmt_from = select(Account).where(Account.id == transfer_data.from_account_id, Account.user_id == current_user.id)
    stmt_to = select(Account).where(Account.id == transfer_data.to_account_id, Account.user_id == current_user.id)
    
    res_from = await session.execute(stmt_from)
    res_to = await session.execute(stmt_to)
    
    from_account = res_from.scalar_one_or_none()
    to_account = res_to.scalar_one_or_none()

    if not from_account or not to_account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Один або обидва рахунки не знайдені"
        )

    # 2. Перевіряємо, чи вистачає грошей на рахунку-відправнику
    if from_account.balance < transfer_data.amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Недостатньо коштів на рахунку {from_account.name}. Баланс: {from_account.balance}"
        )

    # 3. Модифікуємо баланси
    from_account.balance -= transfer_data.amount
    to_account.balance += transfer_data.amount

    # 4. Створюємо дві транзакції для фіксації історії переказу
    desc = transfer_data.description or f"Переказ з {from_account.name} на {to_account.name}"
    
    expense_tx = Transaction(
        amount=transfer_data.amount,
        type="EXPENSE",
        category_name="Переказ",
        description=desc,
        user_id=current_user.id,
        account_id=from_account.id
    )
    
    income_tx = Transaction(
        amount=transfer_data.amount,
        type="INCOME",
        category_name="Переказ",
        description=desc,
        user_id=current_user.id,
        account_id=to_account.id
    )

    session.add_all([from_account, to_account, expense_tx, income_tx])
    await session.commit()

    return {
        "message": "Переказ успішно виконано",
        "amount": transfer_data.amount,
        "from_account": from_account.name,
        "new_balance_from": from_account.balance,
        "to_account": to_account.name,
        "new_balance_to": to_account.balance
    }

@router.patch("/{account_id}", status_code=status.HTTP_200_OK)
async def update_account(
    account_id: UUID,
    payload: AccountUpdate,
    session: SessionDep,
    current_user: CurrentUserDep
):
    """Оновлює назву або баланс рахунку поточного користувача"""
    statement = select(Account).where(Account.id == account_id, Account.user_id == current_user.id)
    result = await session.execute(statement)
    account = result.scalar_one_or_none()
    
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Рахунок не знайдено або він вам не належить"
        )
        
    if payload.name is not None:
        account.name = payload.name
    if payload.balance is not None:
        account.balance = payload.balance
        
    await session.commit()
    await session.refresh(account)
    
    return account

@router.delete("/{account_id}", status_code=status.HTTP_200_OK)
async def delete_account(
    account_id: UUID,
    session: SessionDep,
    current_user: CurrentUserDep
):
    """
    Видаляє рахунок поточного користувача. 
    Усі пов'язані транзакції будуть видалені каскадно!
    """
    # 1. Шукаємо рахунок в базі даних
    statement = select(Account).where(Account.id == account_id, Account.user_id == current_user.id)
    result = await session.execute(statement)
    account = result.scalar_one_or_none()
    
    # 2. Якщо рахунку немає або він належить іншому юзеру — повертаємо 404
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Рахунок не знайдено або він вам не належить"
        )
        
    # 3. Видаляємо рахунок з сесії бази даних
    await session.delete(account)
    await session.commit()
    
    return {"message": f"Рахунок '{account.name}' та всі його транзакції успішно видалені"}

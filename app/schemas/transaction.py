from datetime import datetime
from decimal import Decimal
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, Field


# 1. Створюємо вибір: операція може бути тільки витратою (EXPENSE) або доходом (INCOME)
class TransactionType(str, Enum):
    EXPENSE = "EXPENSE"
    INCOME = "INCOME"

# 2. Схема для вхідних даних (те, що клієнт надсилає нам у POST-запиті)
class TransactionCreate(BaseModel):
    account_id: UUID = Field(..., description="ID рахунку, з якого/на який здійснюється операція")
    amount: Decimal = Field(..., gt=0, max_digits=12, decimal_places=2, description="Сума (має бути більша за 0)")
    type: TransactionType = Field(..., description="Тип операції: EXPENSE або INCOME")
    category_name: str = Field(..., min_length=2, max_length=50, description="Назва категорії, напр. 'Продукти', 'Зарплата'")
    description: str | None = Field(None, max_length=255, description="Опціональний коментар")

# 3. Схема для вихідних даних (те, що ми повертаємо клієнту у відповідь)
class TransactionResponse(BaseModel):
    id: UUID
    account_id: UUID
    amount: Decimal
    type: TransactionType
    category_name: str
    description: str | None
    date: datetime

    class Config:
        from_attributes = True  # Дозволяє Pydantic працювати з об'єктами бази даних SQLModel/SQLAlchemy

class TransactionUpdate(BaseModel):
    amount: Decimal | None = Field(None, gt=0, max_digits=12, decimal_places=2)
    type: TransactionType | None = None
    category_name: str | None = Field(None, min_length=2, max_length=50)
    description: str | None = Field(None, max_length=255)

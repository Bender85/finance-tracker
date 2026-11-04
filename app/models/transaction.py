from datetime import datetime
from decimal import Decimal
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class Transaction(SQLModel, table=True):
    __tablename__ = "transactions"

    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    amount: Decimal = Field(max_digits=12, decimal_places=2, nullable=False)
    type: str = Field(nullable=False)  # EXPENSE або INCOME
    category_name: str = Field(nullable=False, max_length=50, index=True)
    description: str = Field(default="", max_length=255)
    date: datetime = Field(default_factory=datetime.utcnow, index=True)

    # Зовнішній ключ на таблицю користувачів
    user_id: UUID = Field(foreign_key="users.id", nullable=False, ondelete="CASCADE")

    # Зовнішній ключ на таблицю рахунків
    account_id: UUID = Field(foreign_key="accounts.id", nullable=False, ondelete="CASCADE")

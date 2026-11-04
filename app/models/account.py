from datetime import datetime
from decimal import Decimal
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class Account(SQLModel, table=True):
    __tablename__ = "accounts"

    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    name: str = Field(nullable=False, max_length=50)  # Напр., "Картка Моно"
    currency: str = Field(default="UAH", max_length=3)  # UAH, USD, EUR
    balance: Decimal = Field(default=Decimal("0.00"), max_digits=12, decimal_places=2)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Зовнішній ключ (Foreign Key) на таблицю користувачів
    user_id: UUID = Field(foreign_key="users.id", nullable=False, ondelete="CASCADE")

    # --- ДОДАЄМО НОВЕ ПОЛЕ ---
    description: str | None = Field(default=None, max_length=255)

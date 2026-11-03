from typing import Optional

from pydantic import BaseModel, Field
from decimal import Decimal
from uuid import UUID
from datetime import datetime

class AccountCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, description="Назва рахунку")
    currency: str = Field(default="UAH", min_length=3, max_length=3, description="Код валюти")
    balance: Decimal = Field(default=Decimal("0.00"), description="Початковий баланс")

class AccountResponse(BaseModel):
    id: UUID
    name: str
    currency: str
    balance: Decimal
    created_at: datetime

    class Config:
        from_attributes = True


class AccountTransfer(BaseModel):
    from_account_id: UUID = Field(..., description="ID рахунку, з якого знімаються гроші")
    to_account_id: UUID = Field(..., description="ID рахунку, на який зараховуються гроші")
    amount: Decimal = Field(..., gt=0, max_digits=12, decimal_places=2, description="Сума переказу")
    description: Optional[str] = Field(None, max_length=255, description="Коментар до переказу")

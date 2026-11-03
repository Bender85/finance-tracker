from uuid import UUID, uuid4
from typing import Optional
from sqlmodel import SQLModel, Field

class CategoryBudget(SQLModel, table=True):
    __tablename__ = "category_budgets"

    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    user_id: UUID = Field(foreign_key="users.id", index=True)
    category_name: str = Field(max_length=50, index=True)
    amount_limit: float = Field(ge=0, description="Максимальний ліміт витрат")

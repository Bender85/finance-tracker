from decimal import Decimal

from pydantic import BaseModel


class CategoryAggregation(BaseModel):
    category_name: str
    total_amount: Decimal
    amount_limit: float = 0.0      # <-- ДОДАЙ ЦЕЙ РЯДОК З ДЕФОЛТОМ
    is_exceeded: bool = False      # <-- ДОДАЙ ЦЕЙ РЯДОК З ДЕФОЛТОМ

class AnalyticsResponse(BaseModel):
    total_spent: Decimal
    by_categories: list[CategoryAggregation]

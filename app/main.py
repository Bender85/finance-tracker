from contextlib import asynccontextmanager

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Імпортуй middleware
from sqlmodel import SQLModel

from app.api.v1.endpoints.accounts import router as accounts_router
from app.api.v1.endpoints.analytics import router as analytics_router

# Імпортуємо окремі роутери
from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.transactions import router as transactions_router
from app.core.database import engine
from app.models.account import Account
from app.models.transaction import Transaction

# Імпортуємо всі моделі, щоб SQLModel ініціалізував їх у БД при старті
from app.models.user import User


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    yield

main_app = FastAPI(title="Finance Tracker API", lifespan=lifespan)

# Налаштовуємо список дозволених адрес
origins = [
    "http://localhost:3000",
    "http://localhost:5173", # про всяк випадок, якщо захочеш Vite замість CRA
]

main_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Дозволяємо GET, POST, PATCH, DELETE тощо
    allow_headers=["*"],  # Дозволяємо будь-яку кастомізацію заголовків (включаючи наш Authorization)
)

# 1. Створюємо головний роутер для API версії 1
v1_router = APIRouter(prefix="/api/v1")

# 2. Об'єднуємо підроутери, додаючи їм красиві шляхи
v1_router.include_router(auth_router, prefix="/auth")
v1_router.include_router(accounts_router, prefix="/accounts")
v1_router.include_router(transactions_router, prefix="/transactions")
v1_router.include_router(analytics_router, prefix="/analytics")

# 3. Підключаємо підготовлений v1_router до нашого FastAPI додатку
main_app.include_router(v1_router)

@main_app.get("/")
async def root():
    return {"message": "Проект успішно рефакторовано! Архітектура відповідає стандартам production."}

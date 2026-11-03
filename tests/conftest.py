import asyncio
import pytest
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool  # Імпортуємо NullPool
from sqlmodel import SQLModel
from httpx import AsyncClient

from app.main import main_app
from app.api.deps import get_session

TEST_DATABASE_URL = "postgresql+asyncpg://finance_user:finance_secure_password@db:5432/finance_test_db"

# Додаємо poolclass=NullPool, щоб з'єднання не перетиналися між тестами та фікстурами
engine = create_async_engine(TEST_DATABASE_URL, echo=False, future=True, poolclass=NullPool)
TestingSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest.fixture(scope="session", autouse=True)
async def init_db():
    """Створює таблиці перед початком усіх тестів, та очищає після завершення сесії"""
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)

@pytest.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Ізольована чиста сесія для КОЖНОГО конкретного тесту"""
    async with TestingSessionLocal() as session:
        yield session
        await session.rollback()

@pytest.fixture
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """Віртуальний клієнт, що підміняє реальну БД на тестову"""
    async def override_get_session():
        yield db_session

    main_app.dependency_overrides[get_session] = override_get_session
    
    async with AsyncClient(app=main_app, base_url="http://test/api/v1") as ac:
        yield ac
        
    main_app.dependency_overrides.clear()

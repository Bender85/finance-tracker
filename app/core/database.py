from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings

# Створюємо асинхронний двигун для роботи з БД
engine = create_async_engine(settings.DATABASE_URL, echo=True)

# Створюємо фабрику асинхронних сесій
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Функція-залежність (Dependency) для отримання сесії БД в ендпоінти
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session

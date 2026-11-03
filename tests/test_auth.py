import pytest
from httpx import AsyncClient

@pytest.mark.anyio
async def test_register_user_success(client: AsyncClient):
    """Тест успішної реєстрації нового користувача"""
    payload = {
        "email": "test_user_pytest@example.com",
        "password": "securepassword123"
    }
    response = await client.post("/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == payload["email"]
    assert data["is_active"] is True

@pytest.mark.anyio
async def test_register_user_duplicate_email(client: AsyncClient):
    """Тест блокування реєстрації з дублікатом email"""
    payload = {
        "email": "duplicate_pytest@example.com",
        "password": "password123"
    }
    first_response = await client.post("/auth/register", json=payload)
    assert first_response.status_code == 201
    
    second_response = await client.post("/auth/register", json=payload)
    assert second_response.status_code == 400
    assert second_response.json()["detail"] == "Користувач з таким email вже зареєстрований"

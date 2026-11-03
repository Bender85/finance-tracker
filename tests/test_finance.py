import pytest
from httpx import AsyncClient

async def get_auth_headers(client: AsyncClient, email: str, password: str) -> dict:
    """Допоміжна функція: реєструє юзера, логіниться і повертає заголовок з токеном"""
    # 1. Реєстрація
    await client.post("/auth/register", json={"email": email, "password": password})
    # 2. Логін для отримання токена
    login_response = await client.post("/auth/login", data={"username": email, "password": password})
    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.mark.anyio
async def test_create_account_success(client: AsyncClient):
    """Тест успішного створення фінансового рахунку"""
    headers = await get_auth_headers(client, "account_test@example.com", "pass123")
    
    account_payload = {
        "name": "Картка Моно",
        "currency": "UAH",
        "balance": 5000.0
    }
    
    response = await client.post("/accounts/", json=account_payload, headers=headers)
    assert response.status_code == 201
    
    data = response.json()
    assert data["name"] == account_payload["name"]
    assert float(data["balance"]) == account_payload["balance"]
    assert "id" in data


@pytest.mark.anyio
async def test_transaction_updates_balance(client: AsyncClient):
    """Тест: додавання витрати має АВТОМАТИЧНО зменшити баланс рахунку"""
    headers = await get_auth_headers(client, "tx_test@example.com", "pass123")
    
    # 1. Створюємо рахунок із балансом 1000 грн
    acc_response = await client.post("/accounts/", json={"name": "Готівка", "currency": "UAH", "balance": 1000.0}, headers=headers)
    account_id = acc_response.json()["id"]
    
    # 2. Додаємо витрату (EXPENSE) на 300 грн у категорію "Продукти"
    tx_payload = {
        "account_id": account_id,
        "amount": 300.0,
        "type": "EXPENSE",
        "category_name": "Продукти",
        "description": "Сільпо"
    }
    tx_response = await client.post("/transactions/", json=tx_payload, headers=headers)
    assert tx_response.status_code == 201
    
    # 3. Перевіряємо, чи змінився баланс рахунку на бекенді (має стати 1000 - 300 = 700)
    get_acc_response = await client.get("/accounts/", headers=headers)
    accounts_list = get_acc_response.json()
    
    # Знаходимо наш рахунок у списку
    target_account = next(acc for acc in accounts_list if acc["id"] == account_id)
    assert float(target_account["balance"]) == 700.0


@pytest.mark.anyio
async def test_delete_account_success(client: AsyncClient):
    """Тест: успішне видалення власного рахунку (Оновлено під твій роут)"""
    headers = await get_auth_headers(client, "delete_owner@example.com", "pass123")
    
    # 1. Створюємо рахунок
    acc_payload = {"name": "Тимчасовий рахунок", "currency": "UAH", "balance": 100.0}
    create_resp = await client.post("/accounts/", json=acc_payload, headers=headers)
    account_id = create_resp.json()["id"]  # Твій FastAPI повертає UUID у вигляді рядка
    account_name = create_resp.json()["name"]
    
    # 2. Видаляємо його через твій новий DELETE ендпоінт
    delete_resp = await client.delete(f"/accounts/{account_id}", headers=headers)
    
    # Перевіряємо твій статус-код 200 OK та структуру відповіді
    assert delete_resp.status_code == 200
    assert delete_resp.json()["message"] == f"Рахунок '{account_name}' та всі його транзакції успішно видалені"
    
    # 3. Перевіряємо, що його більше немає в списку GET
    get_resp = await client.get("/accounts/", headers=headers)
    accounts_list = get_resp.json()
    assert not any(acc["id"] == account_id for acc in accounts_list)


@pytest.mark.anyio
async def test_delete_account_security_blocked(client: AsyncClient):
    """Тест: хакер не може видалити рахунок іншого користувача (Оновлено під твій роут)"""
    # Створюємо сесію легітимного юзера та його рахунок
    user_headers = await get_auth_headers(client, "legit_user@example.com", "pass123")
    acc_resp = await client.post("/accounts/", json={"name": "Сейф", "currency": "UAH", "balance": 10000.0}, headers=user_headers)
    legit_account_id = acc_resp.json()["id"]
    
    # Створюємо сесію зловмисника (хакера)
    hacker_headers = await get_auth_headers(client, "hacker@example.com", "evil123")
    
    # Хакер намагається видалити рахунок легітимного юзера за його UUID
    evil_delete_resp = await client.delete(f"/accounts/{legit_account_id}", headers=hacker_headers)
    
    # Перевіряємо твій статус 404 та твоє точне формулювання помилки
    assert evil_delete_resp.status_code == 404
    assert evil_delete_resp.json()["detail"] == "Рахунок не знайдено або він вам не належить"

@pytest.mark.anyio
async def test_analytics_calculation_and_clearance(client: AsyncClient):
    """Тест: перевірка розрахунку аналітики за категоріями та її очищення при видаленні"""
    headers = await get_auth_headers(client, "analytics_user@example.com", "pass123")
    
    # 1. Створюємо рахунок із балансом 10 000 грн
    acc_response = await client.post("/accounts/", json={"name": "Основна картка", "currency": "UAH", "balance": 10000.0}, headers=headers)
    account_id = acc_response.json()["id"]
    
    # 2. Додаємо дві транзакції в категорію "Продукти" (200 + 150 = 400 грн)
    await client.post("/transactions/", headers=headers, json={
        "account_id": account_id, "amount": 250.0, "type": "EXPENSE", "category_name": "Продукти", "description": "АТБ"
    })
    await client.post("/transactions/", headers=headers, json={
        "account_id": account_id, "amount": 150.0, "type": "EXPENSE", "category_name": "Продукти", "description": "Сільпо"
    })
    
    # 3. Додаємо одну транзакцію в категорію "Таксі" (300 грн)
    await client.post("/transactions/", headers=headers, json={
        "account_id": account_id, "amount": 300.0, "type": "EXPENSE", "category_name": "Таксі", "description": "Уклон"
    })
    
    # 4. Робимо GET запит на ендпоінт аналітики
    # Примітка: перевір свій точний URL аналітики на бекенді (наприклад, /analytics/ або /analytics/summary)
    analytics_resp = await client.get("/analytics/categories", headers=headers)
    assert analytics_resp.status_code == 200
    
    analytics_data = analytics_resp.json()
    
    # Перевіряємо загальну суму витрат: 250 + 150 + 300 = 700.0
    assert float(analytics_data["total_spent"]) == 700.0
    
    categories = analytics_data["by_categories"]
    
    # Знаходимо категорію "Продукти" та перевіряємо суму (400.0)
    food_cat = next(cat for cat in categories if cat["category_name"] == "Проdukti" or cat["category_name"] == "Продукти")
    assert float(food_cat["total_amount"]) == 400.0
    
    # 5. КАТАРСИС: Видаляємо цей рахунок. Оскільки транзакції видаляються каскадно, 
    # аналітика користувача повинна знову стати АБСОЛЮТНО ПОРОЖНЬОЮ (0.0)!
    await client.delete(f"/accounts/{account_id}", headers=headers)
    
    clean_analytics_resp = await client.get("/analytics/categories", headers=headers)
    clean_data = clean_analytics_resp.json()
    
    assert float(clean_data["total_spent"]) == 0.0
    assert len(clean_data["by_categories"]) == 0

@pytest.mark.anyio
async def test_update_account_success(client: AsyncClient):
    """Тест: успішне оновлення назви та балансу рахунку"""
    headers = await get_auth_headers(client, "update_acc@example.com", "pass123")
    
    # 1. Створюємо рахунок
    create_resp = await client.post("/accounts/", json={"name": "Стара назва", "currency": "USD", "balance": 100.0}, headers=headers)
    account_id = create_resp.json()["id"]
    
    # 2. Робимо PATCH запит на зміну назви та балансу
    update_payload = {"name": "Нова назва корпоративна", "balance": 1250.50}
    patch_resp = await client.patch(f"/accounts/{account_id}", json=update_payload, headers=headers)
    assert patch_resp.status_code == 200
    
    # 3. Перевіряємо, що дані в базі дійсно змінилися
    data = patch_resp.json()
    assert data["name"] == "Нова назва корпоративна"
    assert float(data["balance"]) == 1250.50
    assert data["currency"] == "USD"  # Валюта мала залишитися незмінною

@pytest.mark.anyio
async def test_transaction_filtration_success(client: AsyncClient):
    """Тест: перевірка динамічної фільтрації транзакцій за рахунком та категорією"""
    headers = await get_auth_headers(client, "filter_user@example.com", "pass123")
    
    # 1. Створюємо рахунок
    acc_resp = await client.post("/accounts/", json={"name": "Картка Фільтр", "currency": "UAH", "balance": 5000.0}, headers=headers)
    account_id = acc_resp.json()["id"]
    
    # 2. Додаємо транзакцію №1 (Продукти)
    await client.post("/transactions/", headers=headers, json={
        "account_id": account_id, "amount": 150.0, "type": "EXPENSE", "category_name": "Продукти", "description": "Маркет"
    })
    
    # 3. Додаємо транзакцію №2 (Комуналка)
    await client.post("/transactions/", headers=headers, json={
        "account_id": account_id, "amount": 600.0, "type": "EXPENSE", "category_name": "Комуналка", "description": "Світло"
    })
    
    # 4. Перевіряємо фільтр за категорією "Комуналка"
    filter_resp = await client.get(f"/transactions/?category_name=Комуналка", headers=headers)
    assert filter_resp.status_code == 200
    
    filtered_data = filter_resp.json()
    # Має повернутися рівно ОДИН запис замість двох
    assert len(filtered_data) == 1
    assert filtered_data[0]["category_name"] == "Комуналка"
    assert float(filtered_data[0]["amount"]) == 600.0

@pytest.mark.anyio
async def test_csv_export_success(client: AsyncClient):
    """Тест: успішний експорт фінансового звіту в формат CSV"""
    headers = await get_auth_headers(client, "csv_user@example.com", "pass123")
    
    # 1. Створюємо рахунок
    acc_resp = await client.post("/accounts/", json={"name": "Картка для CSV", "currency": "UAH", "balance": 3000.0}, headers=headers)
    account_id = acc_resp.json()["id"]
    
    # 2. Додаємо одну тестову транзакцію
    await client.post("/transactions/", headers=headers, json={
        "account_id": account_id, "amount": 450.50, "type": "EXPENSE", "category_name": "Продукти", "description": "Експортний чек"
    })
    
    # 3. Робимо запит на новий ендпоінт експорту
    export_resp = await client.get("/transactions/export", headers=headers)
    assert export_resp.status_code == 200
    
    # Перевіряємо заголовки відповіді файлу
    assert "text/csv" in export_resp.headers["content-type"]
    assert "attachment" in export_resp.headers["content-disposition"]
    
    # Перевіряємо вміст згенерованого файлу
    csv_content = export_resp.text
    assert "ID,Date,Type,Amount,Category,Description" in csv_content
    assert "450.50" in csv_content
    assert "Експортний чек" in csv_content

@pytest.mark.anyio
async def test_set_category_budget_success(client: AsyncClient):
    """Тест: успішне встановлення та оновлення ліміту витрат для категорії"""
    headers = await get_auth_headers(client, "budget_user@example.com", "pass123")
    
    # 1. Встановлюємо ліміт на Таксі в розмірі 500 грн
    budget_payload = {"category_name": "Таксі", "amount_limit": 500.0}
    response = await client.post("/transactions/budget", json=budget_payload, headers=headers)
    assert response.status_code == 201
    
    data = response.json()
    assert data["category_name"] == "Таксі"
    assert float(data["amount_limit"]) == 500.0
    
    # 2. Оновлюємо цей же ліміт до 1200 грн
    updated_payload = {"category_name": "Таксі", "amount_limit": 1200.0}
    update_response = await client.post("/transactions/budget", json=updated_payload, headers=headers)
    assert update_response.status_code == 201
    assert float(update_response.json()["amount_limit"]) == 1200.0

@pytest.mark.anyio
async def test_analytics_detects_budget_overrun(client: AsyncClient):
    """Тест: аналітика повинна коректно повертати ліміти та прапорець перевищення бюджету"""
    headers = await get_auth_headers(client, "budget_check@example.com", "pass123")
    
    # 1. Створюємо рахунок
    acc_resp = await client.post("/accounts/", json={"name": "Картка Бюджету", "currency": "UAH", "balance": 1000.0}, headers=headers)
    account_id = acc_resp.json()["id"]
    
    # 2. Встановлюємо ліміт на "Ресторани" (Стукаємо через правильний префікс /transactions)
    await client.post("/transactions/budget", json={"category_name": "Ресторани", "amount_limit": 200.0}, headers=headers)
    
    # 3. Додаємо витрату в ресторан на 250 грн
    await client.post("/transactions/", headers=headers, json={
        "account_id": account_id, "amount": 250.0, "type": "EXPENSE", "category_name": "Ресторани", "description": "Вечеря"
    })
    
    # 4. Робимо чистий GET запит на твою аналітику категорій
    analytics_resp = await client.get("/analytics/categories", headers=headers)
    assert analytics_resp.status_code == 200
    
    data = analytics_resp.json()
    restaurant_cat = next(cat for cat in data["by_categories"] if cat["category_name"] == "Ресторани")
    
    # Валідуємо фінансові прапорці
    assert float(restaurant_cat["amount_limit"]) == 200.0
    assert restaurant_cat["is_exceeded"] is True



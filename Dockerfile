FROM python:3.11-slim

# Налаштування, щоб Python не писав .pyc файли і не буферизував логи
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

# Спочатку копіюємо лише залежності (для ефективного кешування шарів Docker)
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Копіюємо весь код додатку
COPY ./app /code/app

# Команда для запуску FastAPI в режимі розробки (з автоперезавантаженням)
CMD ["uvicorn", "app.main:main_app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

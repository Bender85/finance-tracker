from pydantic import BaseModel, EmailStr, Field

# Схема для даних, які ми очікуємо отримати від користувача при реєстрації
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, description="Пароль має бути не менше 6 символів")

# Схема для відповіді API (ми повертаємо дані без пароля з міркувань безпеки)
class UserResponse(BaseModel):
    email: EmailStr
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
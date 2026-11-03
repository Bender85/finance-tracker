import axiosClient from '../axiosClient';
import type { Token, UserResponse } from '../types';

export const authService = {
  // 1. Реєстрація нового користувача (приймає JSON)
  register: async (email: string, password: string): Promise<UserResponse> => {
    const response = await axiosClient.post<UserResponse>('/auth/register', {
      email,
      password,
    });
    return response.data;
  },

  // 2. Логін користувача (приймає Form Data, як вимагає OAuth2 у FastAPI)
  login: async (email: string, password: string): Promise<Token> => {
    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI OAuth2 очікує email у полі username
    formData.append('password', password);

    const response = await axiosClient.post<Token>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  // 3. Отримання профілю поточного юзера (токен підставиться автоматично інтерцептором)
  getMe: async (): Promise<UserResponse> => {
    const response = await axiosClient.get<UserResponse>('/auth/me');
    return response.data;
  },
};

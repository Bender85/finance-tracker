import axiosClient from '../axiosClient';
import type { TransactionResponse, TransactionType } from '../types';

export const transactionsService = {
  // Отримати історію з фільтрами
  getAll: async (filters?: { account_id?: string; category_name?: string }) => {
    const response = await axiosClient.get<TransactionResponse[]>('/transactions/', {
      params: filters, // Axios автоматично перетворить це на ?account_id=...&category_name=...
    });
    return response.data;
  },

  // Створити транзакцію
  create: async (transaction: { account_id: string; amount: number; type: TransactionType; category_name: string; description?: string }): Promise<TransactionResponse> => {
    const response = await axiosClient.post<TransactionResponse>('/transactions/', transaction);
    return response.data;
  },

  // Видалити транзакцію
  delete: async (transactionId: string): Promise<{ message: string }> => {
    const response = await axiosClient.delete<{ message: string }>(`/transactions/${transactionId}`);
    return response.data;
  },

  // Отримати посилання на скачування CSV-звіту
  getExportUrl: (): string => {
    const token = localStorage.getItem('finance_token');
    return `http://localhost:8000/api/v1/transactions/export?token=${token}`;
  }
};

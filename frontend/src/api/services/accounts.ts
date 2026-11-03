import axiosClient from '../axiosClient';
import type { AccountResponse } from '../types';

export const accountsService = {
  // Отримати всі рахунки поточного юзера
  getAll: async (): Promise<AccountResponse[]> => {
    const response = await axiosClient.get<AccountResponse[]>('/accounts/');
    return response.data;
  },

  // Створити новий рахунок
  create: async (account: { name: string; currency: string; balance: number; description?: string }): Promise<AccountResponse> => {
    const response = await axiosClient.post<AccountResponse>('/accounts/', account);
    return response.data;
  },

  // Зробити переказ між рахунками
  transfer: async (transferData: { from_account_id: string; to_account_id: string; amount: number; description?: string }) => {
    const response = await axiosClient.post('/accounts/transfer', transferData);
    return response.data;
  },

  // Видалити рахунок
  delete: async (accountId: string): Promise<{ message: string }> => {
    const response = await axiosClient.delete<{ message: string }>(`/accounts/${accountId}`);
    return response.data;
  }
};

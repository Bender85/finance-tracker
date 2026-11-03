import axiosClient from './axiosClient'; // Перевір точний шлях до твого axiosClient у проекті

export const deleteAccount = async (accountId: string): Promise<{ message: string }> => {
  // axiosClient сам знає, де лежить токен, і правильно додає його в Headers
  const response = await axiosClient.delete(`/accounts/${accountId}`);
  return response.data;
};

export const updateAccount = async (
  accountId: string, 
  payload: { name?: string; balance?: number }
): Promise<any> => {
  const response = await axiosClient.patch(`/accounts/${accountId}`, payload);
  return response.data;
};

export const setCategoryBudget = async (payload: { category_name: string; amount_limit: number }): Promise<any> => {
  const response = await axiosClient.post('/transactions/budget', payload);
  return response.data;
};

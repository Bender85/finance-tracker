export interface Token {
  access_token: string;
  token_type: string;
}

// Перевір, щоб тут обов'язково було слово export перед interface!
export interface UserResponse {
  email: string;
  is_active: boolean;
}

export interface AccountResponse {
  id: string;
  name: string;
  currency: string;
  balance: number;
  created_at: string;
  description?: string;
}

export type TransactionType = 'EXPENSE' | 'INCOME';

export interface TransactionResponse {
  id: string;
  account_id: string;
  amount: number;
  type: TransactionType;
  category_name: string;
  description: string;
  date: string;
}

export interface CategoryAggregation {
  category_name: string;
  total_amount: number;
  amount_limit: number; // Нове поле
  is_exceeded: boolean;    // Нове поле
}

export interface AnalyticsResponse {
  total_spent: number;
  by_categories: CategoryAggregation[];
}

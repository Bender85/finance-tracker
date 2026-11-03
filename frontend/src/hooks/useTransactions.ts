import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../api/services/transactions';
import type { TransactionType } from '../api/types';

export const useTransactions = (filters?: { type?: TransactionType; category?: string }) => {
  const queryClient = useQueryClient();

  // 1. Запит на стрічку транзакцій (автоматично перестрілює при зміні фільтрів)
  const transactionsQuery = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionsService.getAll(filters),
  });

  // 2. Мутація створення транзакції
  const createTransactionMutation = useMutation({
    mutationFn: transactionsService.create,
    onSuccess: () => {
      // Інвалідуємо ПОВНІСТЮ ВСЕ, бо транзакція міняє баланс рахунку, історію та аналітику!
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });

  // 3. Мутація видалення транзакції
  const deleteTransactionMutation = useMutation({
    mutationFn: transactionsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });

  return {
    transactions: transactionsQuery.data || [],
    isLoadingTransactions: transactionsQuery.isLoading,
    
    createTransaction: createTransactionMutation.mutateAsync,
    isCreatingTransaction: createTransactionMutation.isPending,

    deleteTransaction: deleteTransactionMutation.mutateAsync,
    isDeletingTransaction: deleteTransactionMutation.isPending,
    
    exportUrl: transactionsService.getExportUrl(),
  };
};

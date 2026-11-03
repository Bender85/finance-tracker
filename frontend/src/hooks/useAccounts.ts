import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { accountsService } from '../api/services/accounts';

export const useAccounts = () => {
  const queryClient = useQueryClient();

  // 1. Запит на отримання всіх рахунків
  const accountsQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: accountsService.getAll,
    staleTime: 1000 * 60, // дані вважаються свіжими 1 хвилину
  });

  // 2. Мутація створення рахунку
  const createAccountMutation = useMutation({
    mutationFn: accountsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  // 3. Мутація переказу коштів
  const transferMutation = useMutation({
    mutationFn: accountsService.transfer,
    onSuccess: () => {
      // Оновлюємо і рахунки, і транзакції, бо переказ створює нові записи в історії
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });

  // 4. Мутація видалення рахунку
  const deleteAccountMutation = useMutation({
    mutationFn: accountsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });

  return {
    accounts: accountsQuery.data || [],
    isLoadingAccounts: accountsQuery.isLoading,
    accountsError: accountsQuery.error,

    createAccount: createAccountMutation.mutateAsync,
    isCreatingAccount: createAccountMutation.isPending,

    transferFunds: transferMutation.mutateAsync,
    isTransferring: transferMutation.isPending,

    deleteAccount: deleteAccountMutation.mutateAsync,
    isDeletingAccount: deleteAccountMutation.isPending,
  };
};

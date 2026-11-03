import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/services/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // 1. Мутація для логіну
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      // Зберігаємо токен у localStorage при успішному вході
      localStorage.setItem('finance_token', data.access_token);
      // Інвалідуємо кеш профілю, щоб React Query заново стягнув дані нового юзера
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  // 2. Мутація для реєстрації
  const registerMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.register(email, password),
  });

  // 3. Запит на отримання поточного користувача (спрацює тільки якщо є токен)
  const hasToken = !!localStorage.getItem('finance_token');
  const useUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getMe,
    enabled: hasToken, // запит не вистрелить, якщо юзер не залогінений
    staleTime: 1000 * 60 * 5, // кешуємо профіль на 5 хвилин
  });

  // 4. Функція виходу з системи
  const logout = () => {
    localStorage.removeItem('finance_token');
    queryClient.setQueryData(['currentUser'], null); // очищаємо кеш юзера
  };

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    isRegisterSuccess: registerMutation.isSuccess,

    user: useUserQuery.data,
    isLoadingUser: useUserQuery.isLoading,
    isAuthorized: !!useUserQuery.data,
    logout,
  };
};

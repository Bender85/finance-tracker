import { useQuery } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';
import type { AnalyticsResponse } from '../api/types';

export const useAnalytics = () => {
  const analyticsQuery = useQuery<AnalyticsResponse>({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await axiosClient.get<AnalyticsResponse>('/analytics/categories');
      return response.data;
    },
    staleTime: 1000 * 30, // Дані вважаються свіжими 30 секунд
  });

  return {
    analyticsData: analyticsQuery.data,
    isLoadingAnalytics: analyticsQuery.isLoading,
    analyticsError: analyticsQuery.error,
  };
};

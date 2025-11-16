import axiosInstance from '../../../shared/utils/AxiosInstance';
import { SwapHourData } from '../types/AnalyticsTypes';

export const AnalyticsService = {
  getMostFrequentSwapHour: async (): Promise<SwapHourData[]> => {
    const response = await axiosInstance.get<SwapHourData[]>('/admin/analytics/most-frequent-swap-hour');
    return response.data;
  },
};

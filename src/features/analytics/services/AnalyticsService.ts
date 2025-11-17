import axiosInstance from '../../../shared/utils/AxiosInstance';
import { SwapHourData, StationSwapData, BatteryStatusData } from '../types/AnalyticsTypes';

export const AnalyticsService = {
  getMostFrequentSwapHour: async (): Promise<SwapHourData[]> => {
    const response = await axiosInstance.get<SwapHourData[]>('/admin/analytics/most-frequent-swap-hour');
    return response.data;
  },
  getSwapsPerStation: async (): Promise<StationSwapData[]> => {
    const response = await axiosInstance.get<StationSwapData[]>('/admin/analytics/swaps-per-station');
    return response.data;
  },

  getBatteryStatusDistribution: async (): Promise<BatteryStatusData[]> => {
    const response = await axiosInstance.get<BatteryStatusData[]>('/admin/analytics/battery-status-distribution');
    return response.data;
  },
};

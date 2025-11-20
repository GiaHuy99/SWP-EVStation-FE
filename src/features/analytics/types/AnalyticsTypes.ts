export interface SwapHourData {
  hour: number;
  count: number;
}

export interface StationSwapData {
  stationName: string;
  swapCount: number;
}

export interface BatteryStatusData {
  status: string;
  count: number;
}

export interface AnalyticsState {
  mostFrequentHours: SwapHourData[];
  loading: boolean;
  error: string | null;
}

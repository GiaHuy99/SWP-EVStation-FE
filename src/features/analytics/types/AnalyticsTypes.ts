export interface SwapHourData {
  hour: number;
  count: number;
}

export interface AnalyticsState {
  mostFrequentHours: SwapHourData[];
  loading: boolean;
  error: string | null;
}

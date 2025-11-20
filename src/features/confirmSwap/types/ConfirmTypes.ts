export type SwapStatus = 'PENDING_CONFIRM' | 'COMPLETED' | 'REJECTED';

export interface BatterySwapRecord {
    id: number;
    username: string;
    vehicleId: number;
    stationName: string;
    batterySerialNumber: string;
    status: SwapStatus;
    timestamp: string;
}
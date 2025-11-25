export type SwapStatus = 'PENDING_CONFIRM' | 'COMPLETED' | 'REJECTED' | 'CANCELLED'|'RESERVED';
export interface BatterySwapRecord {
    id: number;
    username: string;
    vehicleId: number;
    stationName: string;
    batterySerialNumber: string;
    oldBatterySerialNumber: string;
    oldBatteryChargePercent: number;
    oldBatterySoH: number;
    availableBatteries: AvailableBattery[];
    status: SwapStatus;
    timestamp: string; // hoặc Date nếu bạn parse sau
    createdAt?: string; // nếu backend có thêm
}
export interface AvailableBattery {
    id: number;
    serialNumber: string;
    chargePercent: number;
    stateOfHealth: number;
    totalCycleCount: number;
    batteryModel: string;
}
export interface ReservedBatteryItem {
    batterySerialId: number;
    serialNumber: string;
    batteryModel: string;
    chargePercent: number;
    stateOfHealth: number;
    totalCycleCount: number;
    status: string; // RESERVED
}

export interface ReservationInfo {
    reservationId: number;
    status: string;
    quantity: number;
    usedCount: number;
    reservedAt: string;
    expireAt: string;
    remainingMinutes: number;
    batteries: ReservedBatteryItem[];
}

export interface ReservationSwapItem {
    id: number;
    username: string;
    vehicleId: number;
    vehicleVin: string;
    stationName: string;

    batterySerialNumber: string;
    oldBatterySerialNumber: string;
    oldBatteryChargePercent: number;
    oldBatterySoH: number;

    availableBatteries: ReservedBatteryItem[];

    status: string;
    timestamp: string;

    reservation: ReservationInfo;
}

export type ReservationSwapList = ReservationSwapItem[];

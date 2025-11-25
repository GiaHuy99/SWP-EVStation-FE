export interface BatterySerial {
    id: number;
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "DAMAGED" | "MAINTENANCE"|"RESERVED";
    stationId: number | null;
    stationName: string | null;
    batteryId: number;
    batteryName?: string;
    soH?: number;
}


export interface CreateBatterySerialPayload {
    status: "AVAILABLE" | "IN_USE" | "DAMAGED" | "MAINTENANCE"|"RESERVED";
    stationId: number | null;
    batteryId: number;
}

export interface BatterySerialState {
    serials: BatterySerial[];
    selectedSerial: BatterySerial | null;
    loading: boolean;
    error: string | null;
    recentUpdates: BatterySerial[];
    recentUpdatesLoading: boolean;
    recentUpdatesError: string | null;
}
export interface UpdateBatterySerialPayload {
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "DAMAGED" | "MAINTENANCE"|"RESERVED";
    stationId: number | null;
    batteryId: number;
}
export interface BatteryRecentUpdate {
    id: number;
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "MAINTENANCE" | "DAMAGED"|"RESERVED";
    stateOfHealth: number;
    chargePercent: number;
    currentCapacity: number;
    initialCapacity: number;
    totalCycleCount: number;
    swapCount: number | null;
    stationId: number;
    stationName: string;
    batteryModelId: number;
    batteryName: string;
    updatedAt: string;
}

export interface BatteryRecentUpdatesState {
    updates: BatteryRecentUpdate[];
    loading: boolean;
    error: string | null;
}
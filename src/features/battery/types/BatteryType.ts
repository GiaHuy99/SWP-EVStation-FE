export interface Battery {
    id: number;
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "DAMAGED"|"MAINTENANCE";
    swapCount: number;
    stationId: number | null;
    stationName: string | null;
}

export interface CreateBatteryPayload {
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "DAMAGED"|"MAINTENANCE";
    swapCount: number;
    stationId: number | null;
}

export interface BatteryState {
    batteries: Battery[];
    selectedBattery: Battery | null;
    loading: boolean;
    error: string | null;
}

export interface UpdateBatteryPayload {
    id: number;
    payload: Partial<CreateBatteryPayload>;
}

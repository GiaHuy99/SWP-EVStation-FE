export interface BatterySerial {
    id: number;
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "DAMAGED" | "MAINTENANCE";
    stationId: number | null;
    stationName: string | null;
    batteryId: number;
    batteryName?: string; }

export interface CreateBatterySerialPayload {
    status: "AVAILABLE" | "IN_USE" | "DAMAGED" | "MAINTENANCE";
    stationId: number | null;
    batteryId: number;
}

export interface BatterySerialState {
    serials: BatterySerial[];
    selectedSerial: BatterySerial | null;
    loading: boolean;
    error: string | null;
}
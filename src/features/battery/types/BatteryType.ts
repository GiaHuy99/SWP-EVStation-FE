export interface Battery {
    id: number;
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "DAMAGED"|"MAINTENANCE"; // có thể mở rộng
    swapCount: number;
    stationId: number | null;
    stationName: string | null;  // có thể null
}
export interface CreateBatteryPayload {
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "DAMAGED"|"MAINTENANCE";
    swapCount: number;
    stationId: number | null; }
export interface BatteryState {
    batteries: Battery[];
    loading: boolean;
    error: string | null;
}
export interface UpdateBatteryPayload extends Battery {}

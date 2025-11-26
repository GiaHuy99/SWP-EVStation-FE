
export type BatteryStatus = "IN_USE" | "AVAILABLE" | "DAMAGED" | "MAINTENANCE" | "EMPTY"; // Thêm EMPTY cho khớp API trạm



export interface Battery {
    id: number;
    serialNumber: string;
    status: BatteryStatus;
}

export interface VehicleApiResponse {
    vehicleId: number;
    vin: string;
    modelName: string;
    planName: string;
    subscriptionStatus: string;
    batteries: Battery[]; // API này trả về pin của xe
}

export interface VehicleDetail {
    id: number;           // Lấy từ vehicleId
    vehicleName: string;  // Lấy từ vin
    currentPlan: string;  // Lấy từ planName
    batteries: Battery[];   // Danh sách pin đi kèm xe này
}


export interface StationDetail {
    id: number;
    name: string;
    location: string | null;
    status: BatteryStatus; // Dùng lại BatteryStatus
    capacity: number;
    phone: string | null;
    latitude: number | null;
    longitude: number | null;
}



export interface SwapBatteryPayload {
    vehicleId: number;
    batterySerialId: number; // Đây là ID của pin (ví dụ: 11, 12)
    stationId: number;
    endPercent: number; // Gửi 0.8 hay 80 tùy API (component đang gửi 80)
}

export interface SwapBatteryResponse {
    message: string;
    oldSerialNumber: string;
    newSerialNumber: string;
    oldSoH: number;
    newSoH: number;
    depthOfDischarge: number;
    degradationThisSwap: number;
    totalCycleCount: number;
    energyUsed: number;
    distanceUsed: number;
    cost: number;
    oldBatteryChargedPercent: number | null;
    status: BatteryStatus;
}

export type SwapStatus = "PENDING" | "COMPLETED" | "CANCELLED" | "FAILED";

export interface SwapHistoryItem {
    id: number;
    stationName: string;
    oldBatterySerial: string;
    newBatterySerial: string;
    energyUsed: number;        // kWh
    distance: number;          // km
    cost: number;              // VND
    status: SwapStatus;
    timestamp: string;         // ISO string
    confirmedAt?: string | null;
    // Có thể thêm sau:
    // vehicleVin?: string;
    // userName?: string;
}

export interface SwapHistoryResponse {
    history: SwapHistoryItem[];
    total: number;
    page: number;
    pageSize: number;
}
/**
 * Các trạng thái có thể có của một cục pin.
 */
export type BatteryStatus = "IN_USE" | "AVAILABLE" | "DAMAGED" | "MAINTENANCE" | "EMPTY"; // Thêm EMPTY cho khớp API trạm

/**
 * --------------------------------------------------------------------------
 * 1. PIN (Battery)
 * --------------------------------------------------------------------------
 */

/**
 * Định nghĩa một cục pin, dựa trên mảng 'batteries' từ API /user/vehicles
 */
export interface Battery {
    id: number;
    serialNumber: string;
    status: BatteryStatus;
}


/**
 * --------------------------------------------------------------------------
 * 2. XE (Vehicle)
 * --------------------------------------------------------------------------
 */

/**
 * ⚡️ MỚI: Dữ liệu thô trả về từ API /user/vehicles
 */
export interface VehicleApiResponse {
    vehicleId: number;
    vin: string;
    modelName: string;
    planName: string;
    subscriptionStatus: string;
    batteries: Battery[]; // API này trả về pin của xe
}

/**
 * ⚡️ CẬP NHẬT: Dữ liệu xe đã qua xử lý (lưu trong Redux state)
 * Giờ đây nó chứa 'id', 'vehicleName', 'currentPlan', và 'batteries'
 */
export interface VehicleDetail {
    id: number;           // Lấy từ vehicleId
    vehicleName: string;  // Lấy từ vin
    currentPlan: string;  // Lấy từ planName
    batteries: Battery[];   // Danh sách pin đi kèm xe này
}


/**
 * --------------------------------------------------------------------------
 * 3. TRẠM (Station)
 * --------------------------------------------------------------------------
 */

/**
 * ⚡️ CẬP NHẬT: Khớp với API /api/stations
 */
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


/**
 * --------------------------------------------------------------------------
 * 4. SWAP (Hành động đổi pin)
 * --------------------------------------------------------------------------
 */

/**
 * Dữ liệu gửi đi khi gọi API POST /user/swap
 */
export interface SwapBatteryPayload {
    vehicleId: number;
    batterySerialId: number; // Đây là ID của pin (ví dụ: 11, 12)
    stationId: number;
    endPercent: number; // Gửi 0.8 hay 80 tùy API (component đang gửi 80)
}

/**
 * Dữ liệu trả về khi swap thành công
 * (Khớp với các thuộc tính bạn đã liệt kê)
 */
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


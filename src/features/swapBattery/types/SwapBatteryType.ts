/**
 * Dữ liệu gửi đi khi thực hiện swap pin.
 */
export interface SwapBatteryPayload {
    vehicleId: number;
    batterySerialId: number;
    stationId: number;
    endPercent: number;
}

/**
 * Các trạng thái có thể có của một cục pin.
 * Bạn có thể thêm các trạng thái khác nếu cần.
 */
export type BatteryStatus = "IN_USE" | "AVAILABLE" | "DAMAGED" | "MAINTENANCE";

/**
 * Dữ liệu nhận về sau khi swap pin thành công.
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
// Type cho response gốc từ API /user/subscriptions/{id}
export interface SubscriptionDetailApiResponse {
    vehicle: string; // "com.evstation.batteryswap.entity.VehicleModel@8309886 VN-NAME-F2868"
    currentPlan: string;
    startDate: string;
    endDate: string;
    nextPlan: string;
}

// Type cho dữ liệu đã được xử lý mà chúng ta sẽ sử dụng trong ứng dụng
export interface VehicleSubscriptionDetail {
    vehicleName: string; // "VN-NAME-F2868"
    currentPlan: string;
    startDate: string;
    endDate: string;
    nextPlan: string;
}
export interface LinkVehiclePayload {
    vehicleModelId: number;
    subscriptionPlanId: number;
}

// -------------------------------------------------------------------
// TYPES CHO DỮ LIỆU LỰA CHỌN (Từ API danh sách, ví dụ /admin/vehicle-models)
// -------------------------------------------------------------------

// Type cho một model xe trong danh sách lựa chọn
export interface VehicleModelSummary {
    id: number;
    name: string;
    brand: string;
    brakeSystem?: string;  // Optional nếu không phải lúc nào cũng có
    weightWithBattery?: number;  // Optional
    // Có thể thêm price hoặc imageUrl nếu API trả về
}

// Type cho một gói đăng ký trong danh sách lựa chọn
export interface PlanSummary {
    id: number;
    planName: string;
    price: number;  // Giả sử có giá, dựa trên ngữ cảnh subscription
    status?: string;  // Optional, ví dụ "AVAILABLE"
    // Có thể thêm durationMonths nếu API trả về
}

// -------------------------------------------------------------------
// TYPES CHO RESPONSE (Dữ liệu nhận về sau khi link thành công)
// -------------------------------------------------------------------

// Type cho đối tượng model xe chi tiết (trong response)
export interface VehicleModel {
    id: number;
    name: string;
    brand: string;
    brakeSystem: string;
    weightWithBattery: number;
}

// Type cho một pin (battery)
export interface Battery {
    id: number;
    serialNumber: string;
    status: 'IN_USE' | 'AVAILABLE' | 'MAINTENANCE';  // Union type cho status enum-like
}

// Type cho subscription chi tiết
export interface Subscription {
    id: number;
    planName: string;
    status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';  // Union type
    startDate: string;  // ISO format: "YYYY-MM-DD"
    endDate: string;    // ISO format
}

// Type cho vehicle chi tiết
export interface Vehicle {
    id: number;
    vin: string;
    model: VehicleModel;
}

// Type cho toàn bộ response sau khi link xe thành công
export interface LinkedVehicleResponse {
    message: string;
    vehicle: Vehicle;
    subscription: Subscription;
    batteries: Battery[];
}
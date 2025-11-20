// types/LinkVehicleType.ts

// -------------------------------------------------------------------
// PAYLOAD – Gửi lên backend khi liên kết xe
// -------------------------------------------------------------------
export interface LinkVehiclePayload {
    vehicleModelId: number;
    subscriptionPlanId: number;
}

// -------------------------------------------------------------------
// DỮ LIỆU CHO DROPDOWN (từ API danh sách)
// -------------------------------------------------------------------
export interface VehicleModelSummary {
    id: number;
    name: string;
    brand: string;
}

export interface PlanSummary {
    id: number;
    planName: string;
    price: number;
}

// -------------------------------------------------------------------
// CHI TIẾT TRONG RESPONSE SAU KHI LINK XE THÀNH CÔNG
// -------------------------------------------------------------------
export interface VehicleModelDetail {
    id: number;
    name: string;
    brand: string;
    wheelbase: string;
    groundClearance: string;
    seatHeight: string;
    frontTire: string;
    rearTire: string;
    frontSuspension: string;
    rearSuspension: string;
    brakeSystem: string;
    trunkCapacity: string;
    weightWithoutBattery: number;
    weightWithBattery: number;
}

export interface Battery {
    id: number;
    serialNumber: string;
    status: 'IN_USE' | 'AVAILABLE' | 'MAINTENANCE';
}

export interface Subscription {
    id: number;
    planName: string;
    status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'EXPIRED'; // quan trọng: có thêm PENDING
    startDate: string;   // "2025-11-20"
    endDate: string;     // "2025-12-20"
}

export interface Vehicle {
    id: number;
    vin: string;
    model: VehicleModelDetail;
}

// -------------------------------------------------------------------
// RESPONSE HOÀN CHỈNH – CÓ INVOICE ĐỂ THANH TOÁN
// -------------------------------------------------------------------
export interface LinkedVehicleResponse {
    message: string;
    invoiceId: number;      // bắt buộc để thanh toán
    invoiceAmount: number;  // số tiền cần thanh toán (VND, không nhân 100)

    vehicle: Vehicle;
    subscription: Subscription;
    batteries: Battery[];
}
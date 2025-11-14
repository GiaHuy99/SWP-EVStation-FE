// src/features/vehicle/types/VehicleTypes.ts

/**
 * Dữ liệu xe trả về từ API
 */
export interface Vehicle {
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

/**
 * Payload khi tạo xe mới
 * - Backend tự sinh ID
 * - Không cần gửi `id`
 */
export interface CreateVehiclePayload {
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

/**
 * Payload khi cập nhật xe
 * - Gửi đầy đủ thông tin (trừ `id`)
 * - Backend giữ nguyên `id`
 */
export interface UpdateVehiclePayload extends CreateVehiclePayload {
    // Có thể thêm các field tùy chọn nếu cần
}

/**
 * State trong Redux
 */
export interface VehicleState {
    vehicles: Vehicle[];
    selectedVehicle: Vehicle | null;
    loading: boolean;
    error: string | null;
}
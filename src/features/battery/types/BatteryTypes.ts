// Dùng để định nghĩa một loại pin (model pin)
export interface BatteryTypes {
    id: number;
    name: string;
    type: string; // Ví dụ: "Scooter", "Motorbike"
    designCapacity: number;
    description: string;
    createdAt: string; // Hoặc Date nếu bạn chuyển đổi
}

// Dữ liệu cần thiết khi tạo một loại pin mới
export interface CreateBatteryTypePayload {
    name: string;
    type: string;
    designCapacity: number;
    description: string;
}

// Dữ liệu để cập nhật thông tin một loại pin
// Có thể dùng Partial<CreateBatteryTypePayload> & { id: number } nếu muốn
export interface UpdateBatteryTypePayload {
    id: number;
    name?: string;
    type?: string;
    designCapacity?: number;
    description?: string;
}

// State cho Redux/Context... để quản lý danh sách các loại pin
export interface BatteryTypeState {
    batteryTypes: BatteryTypes[];
    loading: boolean;
    error: string | null;
}
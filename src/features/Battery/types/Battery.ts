/**
 * Trạng thái hoạt động của một viên pin.
 * Sử dụng một Type riêng để có thể tái sử dụng dễ dàng.
 */
export type BatteryStatus = "AVAILABLE" | "IN_USE" | "DAMAGED" | "MAINTENANCE";

/**
 * Interface định nghĩa cấu trúc DỮ LIỆU ĐẦY ĐỦ của một viên pin.
 * Dựa trên response sau khi update, vì nó chứa nhiều thông tin nhất.
 * Dữ liệu này sẽ được lưu trong Redux state (ví dụ: selectedBattery).
 */
export interface Battery {
    id: number;
    serialNumber: string;
    status: BatteryStatus;

    // Thông tin về trạm (station)
    stationId: number | null;
    stationName: string | null;

    // Thông tin liên kết đến Loại Pin (BatteryType)
    batteryTypeId: number; // ✨ Giả định server sẽ lưu và trả về ID của loại pin
    batteryName: string; // Tên của loại pin (ví dụ: "Lithium 72V - 45Ah")

    // Các thông số kỹ thuật (thường có khi xem chi tiết)
    currentCapacity: number; // Dung lượng hiện tại
    stateOfHealth: number; // Tình trạng "sức khỏe" của pin (%)
}

/**
 * Interface định nghĩa cấu trúc dữ liệu cho mỗi item trong DANH SÁCH pin.
 * Dựa trên response của API `getAll`. Nó đơn giản hơn object Battery đầy đủ.
 * Dùng kiểu này giúp Redux state `batteries` nhẹ hơn.
 */
export interface BatteryListItem {
    id: number;
    serialNumber: string;
    status: BatteryStatus;
    stationId: number | null;
    stationName: string | null;
    batteryTypeId: number; // ✨ Nên có trường này trong API list để dễ dàng liên kết
}

/**
 * Interface định nghĩa PAYLOAD khi TẠO MỚI một viên pin.
 * Đây là dữ liệu client cần gửi lên để tạo một viên pin mới.
 */
export interface CreateBatteryPayload {
    serialNumber: string;
    batteryTypeId: number; // Bắt buộc phải chọn một loại pin khi tạo
    stationId: number | null; // Gán vào trạm nào (hoặc không)
}

/**
 * Interface định nghĩa PAYLOAD khi CẬP NHẬT một viên pin.
 * Chỉ chứa các trường mà người dùng có thể thay đổi được.
 * Dựa trên JSON `update` bạn cung cấp.
 */
export interface UpdateBatteryPayload {
    id: number; // Bắt buộc phải có ID để biết cập nhật viên pin nào
    status?: BatteryStatus; // Trạng thái là tùy chọn, người dùng có thể chỉ muốn đổi trạm
    stationId?: number | null; // Trạm cũng là tùy chọn
}

/**
 * Interface định nghĩa cấu trúc state cho feature `Battery` trong Redux store.
 */
export interface BatteryState {
    batteries: BatteryListItem[]; // Danh sách pin (dạng rút gọn)
    selectedBattery: Battery | null; // Pin được chọn để xem chi tiết (dạng đầy đủ)
    loading: boolean;
    error: string | null;
}
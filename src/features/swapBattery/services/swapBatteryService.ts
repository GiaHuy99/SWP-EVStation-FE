import axiosInstance from "../../../shared/utils/AxiosInstance"; // Giả định đường dẫn này đúng
import {
    SwapBatteryPayload,
    SwapBatteryResponse,
    VehicleDetail,
    Battery,
    StationDetail,
    // ⚡️ Import type API mới
    VehicleApiResponse
} from "../types/SwapBatteryType"; // Import từ file types

// ⛔️ Bỏ hàm parseVehicleName (sẽ dùng 'vin' hoặc 'modelName' trực tiếp)

class SwapBatteryService {
    /**
     * ⚡️ THAY ĐỔI: Dùng API /user/vehicles mới
     * API này trả về cả thông tin pin.
     */
    async getAllVehicles(): Promise<VehicleDetail[]> {
        // Gọi API mới, đã bỏ /api
        const res = await axiosInstance.get<VehicleApiResponse[]>('/user/vehicles');

        // Map dữ liệu mới
        return res.data.map(vehicle => ({
            id: vehicle.vehicleId,          // ⬅️ ID xe
            vehicleName: vehicle.vin,       // ⬅️ Tên xe (dùng 'vin')
            currentPlan: vehicle.planName,  // ⬅️ Gói cước
            batteries: vehicle.batteries,   // ⬅️ Pin đi kèm
        }));
    }

    /**
     * ⛔️ ĐÃ XÓA: getBatteriesByVehicleId
     * Hàm này không cần nữa vì API /user/vehicles đã bao gồm pin.
     */

    /**
     * Lấy TẤT CẢ các trạm (Không đổi)
     * (Đã bỏ /api ở đầu)
     */
    async getAllStations(): Promise<StationDetail[]> {
        const res = await axiosInstance.get<StationDetail[]>('/stations');
        return res.data;
    }

    /**
     * Thực hiện Swap (Không đổi)
     * (Đã bỏ /api ở đầu)
     */
    async swapBattery(payload: SwapBatteryPayload): Promise<SwapBatteryResponse> {
        const res = await axiosInstance.post<SwapBatteryResponse>("/user/swap", payload);
        return res.data;
    }
}

// THAY ĐỔI Ở ĐÂY: Tạo một instance và export nó
const swapBatteryService = new SwapBatteryService();
export default swapBatteryService;


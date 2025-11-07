import axiosInstance from "../../../shared/utils/AxiosInstance"; // Đường dẫn tới axios của bạn
import { Station } from "../types/stationTypes"; // Types bạn đã tạo

/**
 * Service class để quản lý các API liên quan đến Station.
 */
class StationService {
    /**
     * Lấy danh sách tất cả các trạm
     */
    async getStations(): Promise<Station[]> {
        // Dùng API endpoint của bạn
        const res = await axiosInstance.get<Station[]>("/stations");
        return res.data;
    }

    /*
    // Bạn có thể dễ dàng thêm các method khác sau này
    async getStationById(id: number): Promise<Station> {
        const res = await axiosInstance.get<Station>(`/api/stations/${id}`);
        return res.data;
    }
    */
}

// Export một instance (singleton) của Service
export default new StationService();
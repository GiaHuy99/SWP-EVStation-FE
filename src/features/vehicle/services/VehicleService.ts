
import axiosInstance from "../../../shared/utils/AxiosInstance";
import { Vehicle, CreateVehiclePayload, UpdateVehiclePayload } from "../types/VehicleType";

export class VehicleModelService {
    /**
     * Tạo xe mới
     */
    static async create(payload: CreateVehiclePayload): Promise<Vehicle> {
        const res = await axiosInstance.post<Vehicle>("/admin/vehicle-models", payload);
        return res.data;
    }

    /**
     * Lấy tất cả xe
     */
    static async getAll(): Promise<Vehicle[]> {
        const res = await axiosInstance.get<Vehicle[]>("/admin/vehicle-models");
        return res.data;
    }

    /**
     * Lấy xe theo ID
     */
    static async getById(id: number): Promise<Vehicle> {
        const res = await axiosInstance.get<Vehicle>(`/admin/vehicle-models/${id}`);
        return res.data;
    }

    /**
     * Cập nhật xe (chỉ gửi các field cần thay đổi)
     */
    static async update(id: number, payload: UpdateVehiclePayload): Promise<Vehicle> {
        const res = await axiosInstance.put<Vehicle>(`/admin/vehicle-models/${id}`, payload);
        return res.data;
    }

    /**
     * Xóa xe
     */
    static async delete(id: number): Promise<{ message: string }> {
        const res = await axiosInstance.delete<{ message: string }>(`/admin/vehicle-models/${id}`);
        return res.data;
    }
}

export default VehicleModelService;
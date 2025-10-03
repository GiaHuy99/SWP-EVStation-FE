import  axiosInstance  from "../../../shared/utils/AxiosInstance";
import { Vehicle, CreateVehiclePayload } from "../types/VehicleType";

export class VehicleService {
    static async create(payload: CreateVehiclePayload): Promise<Vehicle> {
        const res = await axiosInstance.post<Vehicle>("/admin/vehicles", payload);
        return res.data;
    }
    static async getAll(): Promise<Vehicle[]> {
        const res = await axiosInstance.get<Vehicle[]>("/admin/vehicles");
        return res.data;
    }
    static async getById(id: number): Promise<Vehicle> {
        const res = await axiosInstance.get<Vehicle>(`/admin/vehicles/${id}`);
        return res.data;
    }

    static async update(id: number, payload: Partial<CreateVehiclePayload>): Promise<Vehicle> {
        const res = await axiosInstance.put<Vehicle>(`/admin/vehicles/${id}`, payload);
        return res.data;
    }

    static async delete(id: number): Promise<{ message: string }> {
        const res = await axiosInstance.delete<{ message: string }>(`/admin/vehicles/${id}`);
        return res.data;
    }

}

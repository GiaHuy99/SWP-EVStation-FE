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
}

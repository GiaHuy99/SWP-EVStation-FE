import axiosInstance from "../../../shared/utils/AxiosInstance";
import {Battery, CreateBatteryPayload} from "../types/Battery";
class BatteryServices{
    async createBatteryService(payload: CreateBatteryPayload): Promise<Battery> {
        const res = await axiosInstance.post<Battery>("/battery-serials", payload);
        return res.data;
    }
    async getAll(): Promise<Battery[]> {
        const res = await axiosInstance.get<Battery[]>("/battery-serials");
        return res.data;
    }
    async getBatteryById(id: number): Promise<Battery> {
        const res = await axiosInstance.get<Battery>(`/battery-serials/${id}`);
        return res.data;
    }
    async delete(id: number): Promise<void> {
        await axiosInstance.delete(`/battery-serials/${id}`);
    }
}
export default new BatteryServices();
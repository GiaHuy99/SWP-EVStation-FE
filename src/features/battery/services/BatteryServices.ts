import {Battery, CreateBatteryPayload, UpdateBatteryPayload} from "../types/BatteryType";
import axiosInstance from "../../../shared/utils/AxiosInstance";

class BatteryServices {
    async createBatteryService(payload: CreateBatteryPayload): Promise<Battery> {
        const res = await axiosInstance.post<Battery>("/batteries", payload);
        return res.data;
    }
    async getAll(): Promise<Battery[]> {
        const res = await axiosInstance.get<Battery[]>("/batteries");
        return res.data;
    }
    async getBatteryById(id: number): Promise<Battery> {
        const res = await axiosInstance.get<Battery>(`/batteries/${id}`);
        return res.data;
    }
    async update(payload: UpdateBatteryPayload): Promise<Battery> {
        const res = await axiosInstance.put<Battery>(`/batteries/${payload.id}`, payload);
        return res.data;
    }
    async delete(id: number): Promise<void> {
        await axiosInstance.delete(`/batteries/${id}`);
    }


}

export default new BatteryServices(); // 👈 export instance luôn

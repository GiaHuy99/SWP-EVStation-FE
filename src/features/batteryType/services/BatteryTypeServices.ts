import axiosInstance from "../../../shared/utils/AxiosInstance";
import {
    BatteryTypes,
    CreateBatteryTypePayload,
    UpdateBatteryTypePayload
} from "../types/BatteryTypes";
class BatteryTypeServices {
    async createBatteryService(payload: CreateBatteryTypePayload): Promise<BatteryTypes> {
        const res = await axiosInstance.post<BatteryTypes>("/batteries", payload);
        return res.data;
    }
    async getAll(): Promise<BatteryTypes[]> {
        const res = await axiosInstance.get<BatteryTypes[]>("/batteries");
        return res.data;
    }
    async getBatteryById(id: number): Promise<BatteryTypes> {
        const res = await axiosInstance.get<BatteryTypes>(`/batteries/${id}`);
        return res.data;
    }
    async update(payload: UpdateBatteryTypePayload): Promise<BatteryTypes> {
        const res = await axiosInstance.put<BatteryTypes>(`/batteries/${payload.id}`, payload);
        return res.data;
    }
    async delete(id: number): Promise<void> {
        await axiosInstance.delete(`/batteries/${id}`);
    }


}

export default new BatteryTypeServices(); // 👈 export instance luôn

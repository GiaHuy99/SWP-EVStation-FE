// src/features/battery/services/BatteryServices.ts
import { BatteryType, CreateBatteryTypePayload} from "../types/BatteryType";
import axiosInstance from "../../../shared/utils/AxiosInstance";

export class BatteryServices {
    async createBatteryService(payload: CreateBatteryTypePayload): Promise<BatteryType> {
        const res = await axiosInstance.post<BatteryType>("/batteries", payload);
        return res.data;
    }

    async getAll(): Promise<BatteryType[]> {
        const res = await axiosInstance.get<BatteryType[]>("/batteries");
        return res.data;
    }

    async getBatteryById(id: number): Promise<BatteryType> {
        const res = await axiosInstance.get<BatteryType>(`/batteries/${id}`);
        return res.data;
    }

    async update(id: number, payload: Partial<CreateBatteryTypePayload>): Promise<BatteryType> {
        const res = await axiosInstance.put<BatteryType>(`/batteries/${id}`, payload);
        return res.data;
    }

    async delete(id: number): Promise<void> {
        await axiosInstance.delete(`/batteries/${id}`);
    }


}

export default new BatteryServices();
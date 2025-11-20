// src/features/batterySerial/services/BatterySerialServices.ts
import {BatterySerial, CreateBatterySerialPayload, UpdateBatterySerialPayload} from "../types/BatterySerialTypes";
import axiosInstance from "../../../shared/utils/AxiosInstance";

export class BatterySerialServices {
    async getAll(): Promise<BatterySerial[]> {
        const [serialsRes, batteriesRes] = await Promise.all([
            axiosInstance.get<any[]>("/battery-serials"),
            axiosInstance.get<any[]>("/batteries"),
        ]);

        const batteryMap = new Map<number, string>();
        batteriesRes.data.forEach(b => {
            batteryMap.set(b.id, b.name || `Battery ${b.id}`);
        });

        return serialsRes.data.map(s => ({
            ...s,
            batteryName: batteryMap.get(s.batteryId) || "Không xác định",
        }));
    }

    async create(payload: CreateBatterySerialPayload): Promise<BatterySerial> {
        const res = await axiosInstance.post<BatterySerial>("/battery-serials", payload);
        const batteryRes = await axiosInstance.get(`/batteries/${payload.batteryId}`);
        return {
            ...res.data,
            batteryName: batteryRes.data.name || `Battery ${payload.batteryId}`,
        };
    }

    async update(id: number, payload: Partial<UpdateBatterySerialPayload>): Promise<BatterySerial> {
        const res = await axiosInstance.put<BatterySerial>(`/battery-serials/${id}`, payload);
        if (payload.batteryId) {
            const batteryRes = await axiosInstance.get(`/batteries/${payload.batteryId}`);
            return { ...res.data, batteryName: batteryRes.data.name };
        }
        return res.data;
    }

    async delete(id: number): Promise<void> {
        await axiosInstance.delete(`/battery-serials/${id}`);
    }
}

export default new BatterySerialServices();
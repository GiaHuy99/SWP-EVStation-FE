// src/services/swapBatteryService.ts

import axiosInstance from "../../../shared/utils/AxiosInstance";
import {SwapBatteryPayload, SwapBatteryResponse, VehicleSubscriptionDetail,SubscriptionDetailApiResponse} from "../types/SwapBatteryType";

const parseVehicleName = (rawVehicleString: string): string => {
    if (!rawVehicleString || !rawVehicleString.includes(' ')) {
        return "Chưa có tên";
    }
    const parts = rawVehicleString.split(' ');
    return parts[parts.length - 1];
};

class SwapBatteryService {
    // ... (nội dung class không đổi)
    async swapBattery(payload: SwapBatteryPayload): Promise<SwapBatteryResponse> {
        const res = await axiosInstance.post<SwapBatteryResponse>("/user/swap", payload);
        return res.data;
    }
    async getVehicleDetail(vehicleId: string): Promise<VehicleSubscriptionDetail> {
        const res = await axiosInstance.get<SubscriptionDetailApiResponse>(`/user/subscriptions/${vehicleId}`);
        const rawData = res.data;
        const vehicleName = parseVehicleName(rawData.vehicle);
        return {
            vehicleName: vehicleName,
            currentPlan: rawData.currentPlan,
            startDate: rawData.startDate,
            endDate: rawData.endDate,
            nextPlan: rawData.nextPlan,
        };
    }
}

// THAY ĐỔI Ở ĐÂY: Tạo một instance và export nó
const swapBatteryService = new SwapBatteryService();
export default swapBatteryService;
import axiosInstance from "../../../shared/utils/AxiosInstance";
import { LinkVehiclePayload, LinkedVehicleResponse } from "../types/LinkVehicleType";

class LinkVehicleService {
    async linkVehicle(payload: LinkVehiclePayload): Promise<LinkedVehicleResponse> {
        const res = await axiosInstance.post<LinkedVehicleResponse>("/user/link-vehicle", payload);
        return res.data;
    }

    // Lấy danh sách vehicles (nếu endpoint admin)
    async getVehicles(): Promise<any[]> {
        // Nếu backend expose /admin/vehicles thì đổi lại thành "/admin/vehicles"
        const res = await axiosInstance.get<any[]>("/admin/vehicle-models");
        return res.data;
    }

    // Lấy danh sách subscription plans (admin endpoint)
    async getPlans(): Promise<any[]> {
        // Nếu backend expose /admin/subscription-plans
        const res = await axiosInstance.get<any[]>("/admin/subscription-plans");
        return res.data;
    }
}

export default new LinkVehicleService();

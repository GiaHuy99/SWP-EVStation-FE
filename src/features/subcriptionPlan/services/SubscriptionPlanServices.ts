import axiosInstance from "../../../shared/utils/AxiosInstance";
import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "../types/SubscriptionPlanType";

export class SubscriptionPlanServices {
    static async create(payload: CreateSubscriptionPlanPayload): Promise<SubscriptionPlan> {
        const res = await axiosInstance.post<SubscriptionPlan>("/admin/subscription-plans", payload);
        return res.data;
    }
    static async fetchAll(): Promise<SubscriptionPlan[]> {
        const res = await axiosInstance.get<SubscriptionPlan[]>("/admin/subscription-plans");
        return res.data;
    }
    static async getById(id: number): Promise<SubscriptionPlan> {
        const res = await axiosInstance.get<SubscriptionPlan>(`/admin/subscription-plans/${id}`);
        return res.data;
    }
    static async update(id: number, payload: CreateSubscriptionPlanPayload): Promise<SubscriptionPlan> {
        const res = await axiosInstance.put<SubscriptionPlan>(`/admin/subscription-plans/${id}`, payload);
        return res.data;
    }
    static async delete(id: number): Promise<void> {
        await axiosInstance.delete(`/admin/subscription-plans/${id}`);
    }
}

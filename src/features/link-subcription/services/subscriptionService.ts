// src/features/subscription/services/subscriptionService.ts
import axiosInstance from "../../../shared/utils/AxiosInstance";
import {ChangePlanResponse} from "../types/SubscriptionType";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchSubscriptionPlansApi = async () => {
    const res = await axiosInstance.get("/admin/subscription-plans");
    return res.data;
};
export const changeSubscriptionPlanApi = async (vehicleId: number, newPlanId: number) => {
    console.log("🚀 Sending change plan request:", { vehicleId, newPlanId });
    const res = await axiosInstance.put(
        `/user/subscriptions/${vehicleId}/change-plan`,
        { newPlanId }
    );
    return res.data;
};
export const fetchUserVehiclesApi = async (): Promise<any[]> => {
    const res = await axiosInstance.get<any[]>("/admin/vehicle-models");
    return res.data;
}


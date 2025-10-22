// src/features/subscription/services/subscriptionService.ts
import axiosInstance from "../../../shared/utils/AxiosInstance";

export const fetchSubscriptionPlansApi = async () => {
    const res = await axiosInstance.get("/admin/subscription-plans");
    return res.data;
};

export const changeSubscriptionPlanApi = async (
    subscriptionId: number,
    newPlanId: number
) => {
    const res = await axiosInstance.put(
        `/user/subscriptions/${subscriptionId}/change-plan`,
        { newPlanId }
    );
    return res.data;
};

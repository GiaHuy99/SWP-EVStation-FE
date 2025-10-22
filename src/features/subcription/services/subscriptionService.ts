import axiosInstance from "../../../shared/utils/AxiosInstance";
import { UserSubscription, AutoRenewResponse } from "../types/SubscriptionType";

export const getUserSubscriptions = async (): Promise<UserSubscription[]> => {
    const res = await axiosInstance.get<UserSubscription[]>("/user/subscriptions");
    return res.data;
};

export const autoRenewAll = async (): Promise<AutoRenewResponse> => {
    const res = await axiosInstance.post<AutoRenewResponse>(
        "/admin/subscriptions/auto-renew"
    );
    return res.data;
};

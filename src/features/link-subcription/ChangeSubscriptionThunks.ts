import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchSubscriptionPlansApi,
    changeSubscriptionPlanApi,
    fetchUserVehiclesApi,
} from "./services/subscriptionService";
import { ChangePlanResponse } from "./types/SubscriptionType";

// 🟢 Lấy danh sách gói
export const fetchSubscriptionPlans = createAsyncThunk(
    "subscription/fetchPlans",
    async () => {
        return await fetchSubscriptionPlansApi();
    }
);

// 🟢 Lấy danh sách xe
export const fetchVehicles = createAsyncThunk(
    "subscription/fetchVehicles",
    async () => {
        return await fetchUserVehiclesApi();
    }
);

// 🟢 Đổi gói (vehicleId là id của xe)
export const changeSubscriptionPlan = createAsyncThunk<
    ChangePlanResponse,
    { vehicleId: number; newPlanId: number }
>(
    "subscription/changePlan",
    async ({ vehicleId, newPlanId }) => {
        return await changeSubscriptionPlanApi(vehicleId, newPlanId);
    }
);

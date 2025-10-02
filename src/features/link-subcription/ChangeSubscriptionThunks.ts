// src/features/subscription/ChangeSubscriptionThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchSubscriptionPlansApi,
    changeSubscriptionPlanApi,
} from "./services/subscriptionService";
import { ChangePlanResponse } from "./types/SubscriptionType";

export const fetchSubscriptionPlans = createAsyncThunk(
    "subscription-plans",
    async () => {
        return await fetchSubscriptionPlansApi();
    }
);

export const changeSubscriptionPlan = createAsyncThunk<
    ChangePlanResponse,
    { subscriptionId: number; newPlanId: number; vehicleId?: number }
>("subscription/changePlan", async ({ subscriptionId, newPlanId }) => {
    return await changeSubscriptionPlanApi(subscriptionId, newPlanId);
});
export const fetchVehicles = createAsyncThunk<any[]>(
    "linkVehicle/fetchVehicles",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/vehicles"); // Giả sử endpoint lấy danh sách xe
            if (!response.ok) {
                throw new Error("Failed to fetch vehicles");
            }
            return await response.json();
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to fetch vehicles");
        }
    }
);
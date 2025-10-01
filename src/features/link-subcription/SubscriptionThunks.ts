// src/features/subscription/SubscriptionThunks.ts
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
    { subscriptionId: number; newPlanId: number }
>("subscription/changePlan", async ({ subscriptionId, newPlanId }) => {
    return await changeSubscriptionPlanApi(subscriptionId, newPlanId);
});

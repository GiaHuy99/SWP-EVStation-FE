import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "./types/SubscriptionPlanType";
import { SubscriptionPlanMockService } from "./services/SubscriptionPlanMockService";

export const createSubscriptionPlan = createAsyncThunk<
    SubscriptionPlan,
    CreateSubscriptionPlanPayload,
    { rejectValue: string }
>(
    "subscriptionPlan/create",
    async (payload, { rejectWithValue }) => {
        try {
            return await SubscriptionPlanMockService.create(payload);
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to create subscription plan");
        }
    }
);

export const fetchSubscriptionPlans = createAsyncThunk<
    SubscriptionPlan[],
    void,
    { rejectValue: string }
>("subscriptionPlan/fetch", async (_, { rejectWithValue }) => {
    try {
        return await SubscriptionPlanMockService.fetchAll();
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch plans");
    }
});
export const getSubscriptionPlanById = createAsyncThunk<
    SubscriptionPlan,
    number,
    { rejectValue: string }
>("subscriptionPlan/getById", async (id, { rejectWithValue }) => {
    try {
        return await SubscriptionPlanMockService.getById(id);
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch subscription plan by id");
    }
});
export const updatePlan = createAsyncThunk(
    "subscriptionPlan/updatePlan",
    async ({ id, payload }: { id: number; payload: CreateSubscriptionPlanPayload }, thunkAPI) => {
        try {
            const data: SubscriptionPlan = await SubscriptionPlanMockService.update(id, payload);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Update failed");
        }
    }
);
export const deletePlan = createAsyncThunk(
    "subscriptionPlan/delete",
    async (id: number, thunkAPI) => {
        try {
            await SubscriptionPlanMockService.delete(id); // gọi API DELETE
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Delete failed");
        }
    }
);


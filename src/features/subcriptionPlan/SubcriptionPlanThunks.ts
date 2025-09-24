import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "./types/SubscriptionPlanType";
import { SubscriptionPlanServices } from "./services/SubscriptionPlanServices";

export const createSubscriptionPlan = createAsyncThunk<
    SubscriptionPlan,
    CreateSubscriptionPlanPayload,
    { rejectValue: string }
>(
    "subscriptionPlan/create",
    async (payload, { rejectWithValue }) => {
        try {
            return await SubscriptionPlanServices.create(payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to create subscription plan");
        }
    }
);

export const fetchSubscriptionPlans = createAsyncThunk<
    SubscriptionPlan[],
    void,
    { rejectValue: string }
>("subscriptionPlan/fetch", async (_, { rejectWithValue }) => {
    try {
        return await SubscriptionPlanServices.fetchAll();
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to fetch plans");
    }
});
export const getSubscriptionPlanById = createAsyncThunk<
    SubscriptionPlan,
    number,
    { rejectValue: string }
>("subscriptionPlan/getById", async (id, { rejectWithValue }) => {
    try {
        return await SubscriptionPlanServices.getById(id);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to fetch subscription plan by id");
    }
});
export const updatePlan = createAsyncThunk(
    "subscriptionPlan/updatePlan",
    async ({ id, payload }: { id: number; payload: CreateSubscriptionPlanPayload }, thunkAPI) => {
        try {
            const data: SubscriptionPlan = await SubscriptionPlanServices.update(id, payload);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
        }
    }
);
export const deletePlan = createAsyncThunk(
    "subscriptionPlan/delete",
    async (id: number, thunkAPI) => {
        try {
            await SubscriptionPlanServices.delete(id); // gọi API DELETE
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Delete failed");
        }
    }
);


import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "./types/SubscriptionPlanType";
import { SubscriptionPlanMockService } from "./services/SubscriptionPlanMockService";

// Create subscription plan
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

// Fetch all subscription plans
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

// Get subscription plan by ID
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

// Update subscription plan
export const updatePlan = createAsyncThunk<
    SubscriptionPlan,
    { id: number; payload: CreateSubscriptionPlanPayload },
    { rejectValue: string }
>(
    "subscriptionPlan/updatePlan",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            return await SubscriptionPlanMockService.update(id, payload);
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to update plan");
        }
    }
);

// Delete subscription plan
export const deletePlan = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(
    "subscriptionPlan/delete",
    async (id, { rejectWithValue }) => {
        try {
            await SubscriptionPlanMockService.delete(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to delete plan");
        }
    }
);
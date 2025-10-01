// src/features/subscription/SubscriptionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSubscriptionPlans,
    changeSubscriptionPlan,
} from "./SubscriptionThunks";
import { ChangePlanResponse } from "./types/SubscriptionType";

interface SubscriptionState {
    plans: { id: number; name: string }[];
    loading: boolean;
    error: string | null;
    changeMessage: string | null;
}

const initialState: SubscriptionState = {
    plans: [],
    loading: false,
    error: null,
    changeMessage: null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        clearMessage(state) {
            state.changeMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptionPlans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = action.payload;
            })
            .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch plans";
            })
            .addCase(changeSubscriptionPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeSubscriptionPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.changeMessage = action.payload.message;
            })
            .addCase(changeSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.changeMessage = "Failed to change plan";
            });
    },
});

export const { clearMessage } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionPlanState } from "./types/SubscriptionPlanType";
import {
    createSubscriptionPlan,
    deletePlan,
    fetchSubscriptionPlans,
    getSubscriptionPlanById,
    updatePlan
} from "./SubscriptionPlanMockThunks";

const initialState: SubscriptionPlanState = {
    plans: [],
    selectedPlan: null,
    loading: false,
    error: null,
};

const subscriptionPlanSlice = createSlice({
    name: "subscriptionPlan",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create subscription plan
        builder
            .addCase(createSubscriptionPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubscriptionPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans.push(action.payload);
            })
            .addCase(createSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create plan";
            });

        // Fetch all plans
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
                state.error = action.payload || "Failed to fetch plans";
            });

        // Get plan by ID
        builder
            .addCase(getSubscriptionPlanById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubscriptionPlanById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPlan = action.payload;
            })
            .addCase(getSubscriptionPlanById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch plan";
            });

        // Update plan
        builder
            .addCase(updatePlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePlan.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.plans.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.plans[index] = action.payload;
                }
            })
            .addCase(updatePlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update plan";
            });

        // Delete plan
        builder
            .addCase(deletePlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = state.plans.filter(p => p.id !== action.payload);
            })
            .addCase(deletePlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete plan";
            });
    },
});

export default subscriptionPlanSlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SubscriptionPlan, SubscriptionPlanState} from "./types/SubscriptionPlanType";
import {
    createSubscriptionPlan, deletePlan,
    fetchSubscriptionPlans,
    getSubscriptionPlanById,
    updatePlan
} from "./SubcriptionPlanThunks";

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
            })
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
            })
            .addCase(getSubscriptionPlanById.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(getSubscriptionPlanById.fulfilled, (state, action) => { state.loading = false; state.selectedPlan = action.payload; })
            .addCase(getSubscriptionPlanById.rejected, (state, action) => {
                state.loading = false; state.error = action.payload || "Failed"; }
            )
            .addCase(updatePlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = state.plans.map((s) =>
                    s.id === action.payload.id ? action.payload : s
                );
            })
            .addCase(updatePlan.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deletePlan.fulfilled, (state, action: PayloadAction<number>) => {
                state.plans = state.plans.filter(
                    (station) => station.id !== action.payload
                );
            });
    },
});

export default subscriptionPlanSlice.reducer;

// src/features/subscription/ChangeSubscriptionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSubscriptionPlans,

    changeSubscriptionPlan,
} from "./ChangeSubscriptionThunks";
import { fetchVehicles } from "../link-subcription/Link_SubcriptionThunk";
interface Vehicle {
    id: number;
    model: string;
    vin: string;
}

interface SubscriptionState {
    plans: { id: number; name: string; price?: number }[];
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
    changeMessage: string | null;
}

const initialState: SubscriptionState = {
    plans: [],
    vehicles: [],
    loading: false,
    error: null,
    changeMessage: null,
};

const changeSubscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        clearMessage(state) {
            state.changeMessage = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Plans
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

            // Vehicles
            .addCase(fetchVehicles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch vehicles";
            })

            // Change Plan
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

export const { clearMessage } = changeSubscriptionSlice.actions;

export default changeSubscriptionSlice.reducer;

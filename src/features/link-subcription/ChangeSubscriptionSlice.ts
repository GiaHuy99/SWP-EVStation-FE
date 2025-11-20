// src/features/subscription/ChangeSubscriptionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchSubscriptionPlans, fetchVehicles, changeSubscriptionPlan } from "./ChangeSubscriptionThunks";
import { Vehicle, Plan } from "./types/SubscriptionType";

interface SubscriptionState {
    plans: Plan[];
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
    changeMessage: string | null;
    result: any | null;
}

const initialState: SubscriptionState = {
    plans: [],
    vehicles: [],
    loading: false,
    error: null,
    changeMessage: null,
    result: null,
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
            .addCase(fetchSubscriptionPlans.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = action.payload;
            })
            .addCase(fetchSubscriptionPlans.rejected, (state) => {
                state.loading = false;
                state.error = "Không tải được danh sách gói";
            })

            .addCase(fetchVehicles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state) => {
                state.loading = false;
                state.error = "Không tải được danh sách xe";
            })

            .addCase(changeSubscriptionPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeSubscriptionPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.changeMessage = action.payload.message;
                state.result = action.payload; // ← QUAN TRỌNG: lưu toàn bộ response
                state.error = null;
            })
            .addCase(changeSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.result = null;
            });
    },
});

export const { clearMessage } = changeSubscriptionSlice.actions;
export default changeSubscriptionSlice.reducer;
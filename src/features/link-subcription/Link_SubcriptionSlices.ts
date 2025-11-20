// Link_SubcriptionSlices.ts
import { createSlice } from "@reduxjs/toolkit";
import { linkVehicle, fetchVehicles, fetchPlans } from "./Link_SubcriptionThunk";
import { LinkedVehicleResponse, VehicleModelSummary, PlanSummary } from "./types/LinkVehicleType";

interface LinkVehicleState {
    loading: boolean;
    error: string | null;
    vehicles: VehicleModelSummary[];
    plans: PlanSummary[];
    result: LinkedVehicleResponse | null;
}

const initialState: LinkVehicleState = {
    loading: false,
    error: null,
    vehicles: [],
    plans: [],
    result: null,
};

const linkVehicleSlice = createSlice({
    name: "linkVehicle",
    initialState,
    reducers: {
        clearResult: (state) => {
            state.result = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // ... giữ nguyên như cũ, chỉ đổi type ở fulfilled
        builder
            .addCase(linkVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(linkVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload; // giờ có invoiceId + invoiceAmount
            })
            .addCase(linkVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Link failed";
            })
            // fetchVehicles & fetchPlans giữ nguyên
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = action.payload;
            })
            .addCase(fetchPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = action.payload;
            });
    },
});

export const { clearResult } = linkVehicleSlice.actions;
export default linkVehicleSlice.reducer;
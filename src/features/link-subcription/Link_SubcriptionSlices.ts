import { createSlice } from "@reduxjs/toolkit";
import { linkVehicle, fetchVehicles, fetchPlans } from "./Link_SubcriptionThunk";
import { LinkedVehicleResponse } from "./types/LinkVehicleType";

interface LinkVehicleState {
    loading: boolean;
    error: string | null;
    vehicles: any[];
    plans: any[];
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
        builder
            .addCase(linkVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(linkVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(linkVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Link failed";
            })

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
                state.error = action.payload as string || "Failed to fetch vehicles";
            })

            .addCase(fetchPlans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = action.payload;
            })
            .addCase(fetchPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch plans";
            });
    },
});

export const { clearResult } = linkVehicleSlice.actions;
export default linkVehicleSlice.reducer;

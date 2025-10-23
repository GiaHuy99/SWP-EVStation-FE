import { createSlice, PayloadAction } from "@reduxjs/toolkit";  // Thêm PayloadAction
import { linkVehicle, fetchVehicles, fetchPlans } from "./Link_SubcriptionThunk";  // Fix: Sửa tên file (thêm 's')
import { LinkedVehicleResponse, PlanSummary, VehicleModelSummary } from "./types/LinkVehicleType";

interface LinkVehicleState {
    vehicles: VehicleModelSummary[];
    plans: PlanSummary[];
    loading: boolean;  // Có thể tách thành listLoading/linkLoading nếu cần
    result: LinkedVehicleResponse | null;
    error: string | null;
}

const initialState: LinkVehicleState = {
    vehicles: [],
    plans: [],
    loading: false,
    result: null,
    error: null,
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


            // Fetch Vehicles cases
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
                state.error = (action.payload as string) || action.error?.message || "Failed to fetch vehicles";  // Fix tương tự
            })

            // Fetch Plans cases
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
                state.error = (action.payload as string) || action.error?.message || "Failed to fetch plans";  // Fix tương tự
            });
    },
});

export const { clearResult } = linkVehicleSlice.actions;
export default linkVehicleSlice.reducer;
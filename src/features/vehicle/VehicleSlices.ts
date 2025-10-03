import { createSlice } from "@reduxjs/toolkit";
import { VehicleState } from "./types/VehicleType";
import {createVehicle, fetchVehicles} from "./VehicleThunks";
import {

    fetchVehicleById,
    updateVehicle,
    deleteVehicle,
} from "./VehicleThunks";

const initialState: VehicleState = {
    vehicles: [],
    loading: false,
    error: null
};

export const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles.push(action.payload);
            })
            .addCase(createVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
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
                state.error = action.payload as string;
            })

            // FETCH ALL
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
                state.error = action.payload as string;
            })

            // FETCH BY ID
            .addCase(fetchVehicleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicleById.fulfilled, (state, action) => {
                state.loading = false;
                const existingIndex = state.vehicles.findIndex(v => v.id === action.payload.id);
                if (existingIndex >= 0) {
                    state.vehicles[existingIndex] = action.payload;
                } else {
                    state.vehicles.push(action.payload);
                }
            })
            .addCase(fetchVehicleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.vehicles.findIndex(v => v.id === action.payload.id);
                if (index !== -1) {
                    state.vehicles[index] = action.payload;
                }
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default vehicleSlice.reducer;

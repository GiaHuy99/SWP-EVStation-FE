// src/features/vehicle/slice/VehicleSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
    createVehicle,
    fetchVehicles,
    fetchVehicleById,
    updateVehicle,
    deleteVehicle,
} from "./VehicleThunks";
import { Vehicle, VehicleState } from "../vehicle/types/VehicleType";

const initialState: VehicleState = {
    vehicles: [],
    selectedVehicle: null,
    loading: false,
    error: null,
};

export const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        clearSelectedVehicle: (state) => {
            state.selectedVehicle = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // CREATE
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
                state.selectedVehicle = action.payload;
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
                if (state.selectedVehicle?.id === action.payload.id) {
                    state.selectedVehicle = action.payload;
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
                if (state.selectedVehicle?.id === action.payload) {
                    state.selectedVehicle = null;
                }
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
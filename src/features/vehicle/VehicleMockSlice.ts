import { createSlice } from "@reduxjs/toolkit";
import { VehicleState } from "./types/VehicleMockType";
import { createVehicle, deleteVehicle, fetchVehicles, getVehicleById, updateVehicle } from "./VehicleMockThunks";

const initialState: VehicleState = {
    vehicles: [],
    selectedVehicle: null,
    loading: false,
    error: null,
};

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        clearSelectedVehicle(state) {
            state.selectedVehicle = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create
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
                state.error = action.payload || "Failed to create vehicle";
            })

            // Fetch all
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
                state.error = action.payload || "Failed to fetch vehicles";
            })

            // Get by ID
            .addCase(getVehicleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVehicleById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedVehicle = action.payload;
            })
            .addCase(getVehicleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch vehicle";
            })

            // Update
            .addCase(updateVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = state.vehicles.map((vehicle) =>
                    vehicle.id === action.payload.id ? action.payload : vehicle
                );
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update vehicle";
            })

            // Delete
            .addCase(deleteVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = state.vehicles.filter(
                    (vehicle) => vehicle.id !== action.payload
                );
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete vehicle";
            });
    },
});

export const { clearSelectedVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
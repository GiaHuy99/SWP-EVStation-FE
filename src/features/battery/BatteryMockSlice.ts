import { createSlice } from "@reduxjs/toolkit";
import { Battery, BatteryState } from "./types/BatteryType";
import { createBattery, deleteBattery, fetchBatteries, getBatteryById, updateBattery } from "./BatteryMockThunks";

const initialState: BatteryState = {
    batteries: [],
    selectedBattery: null,
    loading: false,
    error: null,
};

const batterySlice = createSlice({
    name: "battery",
    initialState,
    reducers: {
        clearSelectedBattery(state) {
            state.selectedBattery = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createBattery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBattery.fulfilled, (state, action) => {
                state.loading = false;
                state.batteries.push(action.payload);
            })
            .addCase(createBattery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create battery";
            })

            // Fetch all
            .addCase(fetchBatteries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBatteries.fulfilled, (state, action) => {
                state.loading = false;
                state.batteries = action.payload;
            })
            .addCase(fetchBatteries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch batteries";
            })

            // Get by ID
            .addCase(getBatteryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBatteryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBattery = action.payload;
            })
            .addCase(getBatteryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch battery";
            })

            // Update
            .addCase(updateBattery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBattery.fulfilled, (state, action) => {
                state.loading = false;
                state.batteries = state.batteries.map((battery: Battery) =>
                    battery.id === action.payload.id ? action.payload : battery
                );
            })
            .addCase(updateBattery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update battery";
            })

            // Delete
            .addCase(deleteBattery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBattery.fulfilled, (state, action) => {
                state.loading = false;
                state.batteries = state.batteries.filter(
                    (battery: Battery) => battery.id !== action.payload
                );
            })
            .addCase(deleteBattery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete battery";
            });
    },
});

export const { clearSelectedBattery } = batterySlice.actions;
export default batterySlice.reducer;
// src/features/battery/BatterySlice.ts
import {createSlice} from "@reduxjs/toolkit";
import {Battery} from "./types/BatteryType";
import {createBattery, deleteBattery, fetchBatteries, getBatteryById, updateBattery} from "./BatteryThunk";

interface BatteryState {
    batteries: Battery[];
    selectedBattery: Battery | null;
    loading: boolean;
    error: string | null;
}
const initialState: BatteryState = {
    batteries: [],
    selectedBattery: null,
    loading: false,
    error: null,
};
const batterySlice = createSlice({
    name: "battery",
    initialState,
    reducers: {clearSelectedBattery: (state) => {
            state.selectedBattery = null;
        },
    },
    extraReducers: (builder) => {
        builder
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
                state.error = action.payload as string;
            })
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
                state.error = action.payload as string;
            })
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
                state.error = action.error.message || "Failed to fetch battery";
            })
            .addCase(updateBattery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBattery.fulfilled, (state, action) => {
                state.loading = false;
                state.batteries = state.batteries.map((b) =>
                    b.id === action.payload.id ? action.payload : b
                );
            })
            .addCase(deleteBattery.fulfilled, (state, action) => {
                // action.payload là id của battery vừa xóa
                state.batteries = state.batteries.filter(
                    (battery) => battery.id !== action.payload
                );
            })
            .addCase(updateBattery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});
export const { clearSelectedBattery } = batterySlice.actions;

export default batterySlice.reducer;

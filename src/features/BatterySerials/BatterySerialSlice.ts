// src/features/batterySerial/slice/BatterySerialSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { BatterySerial, BatterySerialState } from "./types/BatterySerialTypes";
import {
    fetchBatterySerials,
    createBatterySerial,
    updateBatterySerial,
    deleteBatterySerial,
    transferBattery,
    updateBatterySoH,
    fetchRecentBatteryUpdates, // ← THÊM MỚI
} from "./BatterySerialThunk";

const initialState: BatterySerialState = {
    serials: [],
    selectedSerial: null,
    loading: false,
    error: null,

    recentUpdates: [],
    recentUpdatesLoading: false,
    recentUpdatesError: null,
};

const batterySerialSlice = createSlice({
    name: "batterySerial",
    initialState,
    reducers: {
        clearRecentUpdatesError: (state) => {
            state.recentUpdatesError = null;
        },
    },
    extraReducers: (builder) => {
        // === Các case cũ giữ nguyên ===
        builder
            .addCase(fetchBatterySerials.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBatterySerials.fulfilled, (state, action) => {
                state.loading = false;
                state.serials = action.payload;
            })
            .addCase(fetchBatterySerials.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createBatterySerial.fulfilled, (state, action) => {
                state.serials.push(action.payload);
            })
            .addCase(updateBatterySerial.fulfilled, (state, action) => {
                state.serials = state.serials.map((s) =>
                    s.id === action.payload.id ? action.payload : s
                );
            })
            .addCase(deleteBatterySerial.fulfilled, (state, action) => {
                state.serials = state.serials.filter((s) => s.id !== action.payload);
            })

            // === THÊM MỚI: Recent Updates ===
            .addCase(fetchRecentBatteryUpdates.pending, (state) => {
                state.recentUpdatesLoading = true;
                state.recentUpdatesError = null;
            })
            .addCase(fetchRecentBatteryUpdates.fulfilled, (state, action) => {
                state.recentUpdatesLoading = false;
                state.recentUpdates = action.payload;
            })
            .addCase(fetchRecentBatteryUpdates.rejected, (state, action) => {
                state.recentUpdatesLoading = false;
                state.recentUpdatesError = action.payload as string;
            });
    },
});

export const { clearRecentUpdatesError } = batterySerialSlice.actions;
export default batterySerialSlice.reducer;
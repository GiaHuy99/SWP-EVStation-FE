// src/features/batterySerial/slice/BatterySerialSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {BatterySerial, BatterySerialState} from "./types/BatterySerialTypes";
import {
    fetchBatterySerials,
    createBatterySerial,
    updateBatterySerial,
    deleteBatterySerial,
} from "./BatterySerialThunk";

const initialState: BatterySerialState = {
    serials: [],
    selectedSerial: null,
    loading: false,
    error: null,
};

const batterySerialSlice = createSlice({
    name: "batterySerial",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
                state.serials = state.serials.map(s =>
                    s.id === action.payload.id ? action.payload : s
                );
            })

            .addCase(deleteBatterySerial.fulfilled, (state, action) => {
                state.serials = state.serials.filter(s => s.id !== action.payload);
            });
    },
});

export default batterySerialSlice.reducer;
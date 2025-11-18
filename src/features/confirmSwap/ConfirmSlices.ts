// src/features/staff-swap/StaffSwapSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BatterySwapRecord } from "./types/ConfirmTypes";
import { fetchPendingSwaps, confirmSwap, rejectSwap } from "./ConfirmThunks";

interface StaffSwapState {
    pendingList: BatterySwapRecord[];
    loading: boolean;
    actionLoading: { [key: number]: boolean }; // Theo dõi loading từng hành động
    error: string | null;
    successMessage: string | null;
}

const initialState: StaffSwapState = {
    pendingList: [],
    loading: false,
    actionLoading: {},
    error: null,
    successMessage: null,
};

const staffSwapSlice = createSlice({
    name: "staffSwap",
    initialState,
    reducers: {
        clearMessages(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // === FETCH PENDING ===
            .addCase(fetchPendingSwaps.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPendingSwaps.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingList = action.payload;
            })
            .addCase(fetchPendingSwaps.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Lỗi tải danh sách";
            })

            // === CONFIRM ===
            .addCase(confirmSwap.pending, (state, action) => {
                state.actionLoading[action.meta.arg] = true;
                state.error = null;
            })
            .addCase(confirmSwap.fulfilled, (state, action) => {
                state.actionLoading[action.payload.id] = false;
                state.successMessage = action.payload.message;
                // Xóa khỏi danh sách pending
                state.pendingList = state.pendingList.filter((s) => s.id !== action.payload.id);
            })
            .addCase(confirmSwap.rejected, (state, action) => {
                state.actionLoading[action.meta.arg] = false;
                state.error = action.payload as string;
            })

            // === REJECT ===
            .addCase(rejectSwap.pending, (state, action) => {
                state.actionLoading[action.meta.arg] = true;
                state.error = null;
            })
            .addCase(rejectSwap.fulfilled, (state, action) => {
                state.actionLoading[action.payload.id] = false;
                state.successMessage = action.payload.message;
                // Xóa khỏi danh sách pending
                state.pendingList = state.pendingList.filter((s) => s.id !== action.payload.id);
            })
            .addCase(rejectSwap.rejected, (state, action) => {
                state.actionLoading[action.meta.arg] = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearMessages } = staffSwapSlice.actions;
export default staffSwapSlice.reducer;
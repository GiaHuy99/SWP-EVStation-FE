// src/features/staff-swap/StaffSwapSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BatterySwapRecord } from "./types/ConfirmTypes";
import {
    fetchPendingSwaps,
    confirmSwap,
    rejectSwap,
    fetchBatteriesAtStation
} from "./ConfirmThunks";

interface StaffSwapState {
    // === ĐỔI PIN ===
    pendingList: BatterySwapRecord[];
    loading: boolean;
    actionLoading: { [key: number]: boolean };

    // === DANH SÁCH PIN TẠI TRẠM ===
    batteries: any[];           // ← ĐÃ THÊM
    batteriesLoading: boolean;  // ← ĐÃ THÊM (tách riêng để không ảnh hưởng đổi pin)
    batteriesError: string | null; // ← ĐÃ THÊM

    // === CHUNG ===
    error: string | null;
    successMessage: string | null;
}

const initialState: StaffSwapState = {
    pendingList: [],
    loading: false,
    actionLoading: {},

    batteries: [],              // ← BẮT BUỘC PHẢI CÓ
    batteriesLoading: false,    // ← BẮT BUỘC PHẢI CÓ
    batteriesError: null,       // ← BẮT BUỘC PHẢI CÓ

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
            state.batteriesError = null; // Xóa luôn lỗi pin
        },
    },
    extraReducers: (builder) => {
        builder
            // === FETCH PENDING SWAPS ===
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
                state.error = action.error.message || "Lỗi tải danh sách yêu cầu";
            })

            // === CONFIRM SWAP ===
            .addCase(confirmSwap.pending, (state, action) => {
                state.actionLoading[action.meta.arg] = true;
            })
            .addCase(confirmSwap.fulfilled, (state, action) => {
                state.actionLoading[action.payload.id] = false;
                state.successMessage = "Đã duyệt thành công!";
                state.pendingList = state.pendingList.filter(s => s.id !== action.payload.id);
            })
            .addCase(confirmSwap.rejected, (state, action) => {
                state.actionLoading[action.meta.arg] = false;
                state.error = action.payload as string;
            })

            // === REJECT SWAP ===
            .addCase(rejectSwap.pending, (state, action) => {
                state.actionLoading[action.meta.arg] = true;
            })
            .addCase(rejectSwap.fulfilled, (state, action) => {
                state.actionLoading[action.payload.id] = false;
                state.successMessage = "Đã từ chối yêu cầu!";
                state.pendingList = state.pendingList.filter(s => s.id !== action.payload.id);
            })
            .addCase(rejectSwap.rejected, (state, action) => {
                state.actionLoading[action.meta.arg] = false;
                state.error = action.payload as string;
            })

            // === FETCH BATTERIES AT STATION ===
            .addCase(fetchBatteriesAtStation.pending, (state) => {
                state.batteriesLoading = true;
                state.batteriesError = null;
            })
            .addCase(fetchBatteriesAtStation.fulfilled, (state, action) => {
                state.batteriesLoading = false;
                state.batteries = action.payload;
            })
            .addCase(fetchBatteriesAtStation.rejected, (state, action) => {
                state.batteriesLoading = false;
                state.batteriesError = action.payload as string;
            });
    },
});

export const { clearMessages } = staffSwapSlice.actions;
export default staffSwapSlice.reducer;
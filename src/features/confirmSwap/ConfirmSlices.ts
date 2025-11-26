// src/features/staff-swap/StaffSwapSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchPendingSwaps,
    confirmSwap,
    rejectSwap,
  fetchBatteriesAtStation,   // Lấy chi tiết + pin đã reserve khi mở dialog
} from "./ConfirmThunks";
import { BatterySwapRecord } from "./types/ConfirmTypes";

interface StaffSwapState {
    pendingList: BatterySwapRecord[];        // Đổi pin thường
    reservedList: BatterySwapRecord[];       // Yêu cầu đặt trước (chỉ thông tin cơ bản)
    reservedDetail: BatterySwapRecord | null; // Chi tiết reservation + danh sách pin đã reserve
    batteriesAtStation: any[];        // ← THÊM DÒNG NÀY
    batteriesLoading: boolean;
    loading: boolean;
    loadingReserved: boolean;
    loadingDetail: boolean;

    actionLoading: { [key: number]: boolean }; // Loading cho từng nút hành động

    error: string | null;
    successMessage: string | null;
}

const initialState: StaffSwapState = {
    pendingList: [],
    reservedList: [],
    reservedDetail: null,

    loading: false,
    loadingReserved: false,
    loadingDetail: false,

    actionLoading: {},
    batteriesAtStation: [],
    batteriesLoading: false,
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
        clearReservedDetail(state) {
            state.reservedDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBatteriesAtStation.pending, (state) => {
                state.batteriesLoading = true;
            })
            .addCase(fetchBatteriesAtStation.fulfilled, (state, action) => {
                state.batteriesLoading = false;
                state.batteriesAtStation = action.payload;
            })
            .addCase(fetchBatteriesAtStation.rejected, (state) => {
                state.batteriesLoading = false;
            })
            // 1. Danh sách đổi pin
            .addCase(fetchPendingSwaps.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPendingSwaps.fulfilled, (state, action: PayloadAction<BatterySwapRecord[]>) => {
                state.loading = false;
                state.pendingList = action.payload;
            })
            .addCase(fetchPendingSwaps.rejected, (state) => {
                state.loading = false;
            })

            // 4. Xác nhận (cả đổi pin và cấp pin đặt trước) – DÙNG CHÍNH confirmSwap bạn đang có
            .addCase(confirmSwap.pending, (state, action) => {
                const id = action.meta.arg; // id được truyền vào confirmSwap(id)
                state.actionLoading[id] = true;
            })
            .addCase(confirmSwap.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.actionLoading[id] = false;
                state.successMessage = "Thao tác thành công!";

                // Xóa khỏi cả 2 danh sách
                state.pendingList = state.pendingList.filter((s) => s.id !== id);
                state.reservedList = state.reservedList.filter((s) => s.id !== id);

                // Nếu đang mở dialog chi tiết → clear luôn
                if (state.reservedDetail?.id === id) {
                    state.reservedDetail = null;
                }
            })
            .addCase(confirmSwap.rejected, (state, action) => {
                const id = action.meta.arg as number;
                state.actionLoading[id] = false;
                state.error = (action.payload as string) || "Xác nhận thất bại";
            })

            // 5. Từ chối đổi pin
            .addCase(rejectSwap.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.pendingList = state.pendingList.filter((s) => s.id !== id);
                state.successMessage = "Đã từ chối yêu cầu!";
            });
    },
});

export const { clearMessages, clearReservedDetail } = staffSwapSlice.actions;
export default staffSwapSlice.reducer;
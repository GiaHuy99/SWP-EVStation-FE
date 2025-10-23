// src/store/swap/SwapSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Import cả 2 thunks
import { swapBattery, getVehicleDetail } from "./SwapThunks";
import { SwapBatteryResponse, VehicleSubscriptionDetail } from "./types/SwapBatteryType";

// 1. Cập nhật kiểu dữ liệu cho State
interface SwapBatteryState {
    // Trạng thái cho hành động SWAP
    swapLoading: boolean;
    swapResult: SwapBatteryResponse | null;
    swapError: string | null;

    // ⚡️ TRẠNG THÁI MỚI: Cho việc lấy thông tin xe
    vehicleDetail: VehicleSubscriptionDetail | null;
    vehicleLoading: boolean;
    vehicleError: string | null;
}

// 2. Cập nhật trạng thái ban đầu
const initialState: SwapBatteryState = {
    swapLoading: false,
    swapResult: null,
    swapError: null,

    vehicleDetail: null,
    vehicleLoading: false,
    vehicleError: null,
};

const swapBatterySlice = createSlice({
    name: "swapBattery",
    initialState,
    reducers: {
        clearSwapResult: (state) => {
            state.swapResult = null;
            state.swapError = null;
        },
        // ⚡️ ACTION MỚI: Xóa thông tin xe khi cần
        clearVehicleDetail: (state) => {
            state.vehicleDetail = null;
            state.vehicleError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Xử lý cho swapBattery ---
            .addCase(swapBattery.pending, (state) => {
                state.swapLoading = true;
                state.swapError = null;
                state.swapResult = null;
            })
            .addCase(swapBattery.fulfilled, (state, action: PayloadAction<SwapBatteryResponse>) => {
                state.swapLoading = false;
                state.swapResult = action.payload;
            })
            .addCase(swapBattery.rejected, (state, action) => {
                state.swapLoading = false;
                state.swapError = action.payload as string;
            })

            // --- ⚡️ XỬ LÝ MỚI: Cho getVehicleDetail ---
            .addCase(getVehicleDetail.pending, (state) => {
                state.vehicleLoading = true;
                state.vehicleError = null;
                state.vehicleDetail = null;
            })
            .addCase(getVehicleDetail.fulfilled, (state, action: PayloadAction<VehicleSubscriptionDetail>) => {
                state.vehicleLoading = false;
                state.vehicleDetail = action.payload;
            })
            .addCase(getVehicleDetail.rejected, (state, action) => {
                state.vehicleLoading = false;
                state.vehicleError = action.payload as string;
            });
    },
});

// 5. Export các action và reducer
export const { clearSwapResult, clearVehicleDetail } = swapBatterySlice.actions;
export default swapBatterySlice.reducer;
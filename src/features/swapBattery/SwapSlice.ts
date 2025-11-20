import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// ⚡️ Import các thunk đã cập nhật
import {
    swapBattery,
    getAllVehicles, // Đã đổi tên
    getAllStations
} from "./SwapThunks";
// ⚡️ Import các type (không cần Battery riêng lẻ)
import {
    SwapBatteryResponse,
    VehicleDetail,
    StationDetail
} from "./types/SwapBatteryType";

// 1. ⚡️ Cập nhật State (Bỏ batteries)
interface SwapBatteryState {
    // Trạng thái cho hành động SWAP
    swapLoading: boolean;
    swapResult: SwapBatteryResponse | null;
    swapError: string | null;

    // Trạng thái cho danh sách XE
    vehicles: VehicleDetail[]; // ⬅️ Đã bao gồm pin
    vehiclesLoading: boolean;
    vehiclesError: string | null;

    // Trạng thái cho danh sách TRẠM
    stations: StationDetail[];
    stationsLoading: boolean;
    stationsError: string | null;

    // ⛔️ Đã BỎ: State cho 'batteries' (batteries, batteriesLoading, batteriesError)
}

// 2. ⚡️ Cập nhật trạng thái ban đầu
const initialState: SwapBatteryState = {
    swapLoading: false,
    swapResult: null,
    swapError: null,

    vehicles: [],
    vehiclesLoading: false,
    vehiclesError: null,

    stations: [],
    stationsLoading: false,
    stationsError: null,
};

const swapBatterySlice = createSlice({
    name: "swapBattery",
    initialState,
    reducers: {
        clearSwapResult: (state) => {
            state.swapResult = null;
            state.swapError = null;
        },
        // ⛔️ Đã BỎ: clearBatteries (không cần nữa)
    },
    // 3. ⚡️ Cập nhật extraReducers
    extraReducers: (builder) => {
        builder
            // --- Xử lý cho swapBattery (Không đổi) ---
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

            // --- ⚡️ CẬP NHẬT: Xử lý cho getAllVehicles (thay vì getAllVehicleSubscriptions) ---
            .addCase(getAllVehicles.pending, (state) => {
                state.vehiclesLoading = true;
                state.vehiclesError = null;
                state.vehicles = []; // Xóa danh sách cũ khi tải
            })
            .addCase(getAllVehicles.fulfilled, (state, action: PayloadAction<VehicleDetail[]>) => {
                state.vehiclesLoading = false;
                state.vehicles = action.payload;
            })
            .addCase(getAllVehicles.rejected, (state, action) => {
                state.vehiclesLoading = false;
                state.vehiclesError = action.payload as string;
            })

            // --- ⛔️ ĐÃ BỎ: Xử lý cho getBatteriesForVehicle ---

            // --- Xử lý cho getAllStations (Không đổi) ---
            .addCase(getAllStations.pending, (state) => {
                state.stationsLoading = true;
                state.stationsError = null;
                state.stations = []; // Xóa danh sách cũ khi tải
            })
            .addCase(getAllStations.fulfilled, (state, action: PayloadAction<StationDetail[]>) => {
                state.stationsLoading = false;
                state.stations = action.payload;
            })
            .addCase(getAllStations.rejected, (state, action) => {
                state.stationsLoading = false;
                state.stationsError = action.payload as string;
            });
    },
});

// 5. ⚡️ Cập nhật export (Bỏ clearBatteries)
export const { clearSwapResult } = swapBatterySlice.actions;
export default swapBatterySlice.reducer;


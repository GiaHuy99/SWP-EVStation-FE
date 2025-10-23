
import { createAsyncThunk } from "@reduxjs/toolkit";
import  swapBatteryService  from "./services/swapBatteryService";
import {
    SwapBatteryPayload,
    SwapBatteryResponse,
    VehicleSubscriptionDetail // Import kiểu dữ liệu cho chi tiết xe
} from "./types/SwapBatteryType"; // Sửa lại đường dẫn nếu cần

/**
 * ⚡️ THUNK MỚI: Lấy thông tin chi tiết của xe
 * - `VehicleSubscriptionDetail`: Kiểu dữ liệu trả về khi thành công.
 * - `string`: Kiểu dữ liệu của payload gửi đi (chính là vehicleId).
 */
export const getVehicleDetail = createAsyncThunk<
    VehicleSubscriptionDetail,
    string, // Payload là vehicleId
    { rejectValue: string }
>(
    "swapBattery/getVehicleDetail", // Tên action
    async (vehicleId, { rejectWithValue }) => {
        try {
            const response = await swapBatteryService.getVehicleDetail(vehicleId);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Lấy thông tin xe thất bại.";
            return rejectWithValue(errorMessage);
        }
    }
);


/**
 * Async thunk để thực hiện hành động swap pin.
 */
export const swapBattery = createAsyncThunk<
    SwapBatteryResponse,
    SwapBatteryPayload,
    { rejectValue: string }
>(
    "swapBattery/swap",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await swapBatteryService.swapBattery(payload);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Thực hiện đổi pin thất bại.";
            return rejectWithValue(errorMessage);
        }
    }
);
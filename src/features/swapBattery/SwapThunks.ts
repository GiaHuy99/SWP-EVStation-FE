import { createAsyncThunk } from "@reduxjs/toolkit";
// ⚡️ Import service
import  swapBatteryService  from "./services/swapBatteryService";
import {
    SwapBatteryPayload,
    SwapBatteryResponse,
    VehicleDetail,
    // Battery (Không cần import ở đây, vì nó nằm trong VehicleDetail)
    StationDetail
} from "./types/SwapBatteryType"; // Import từ file types

/**
 * ⚡️ CẬP NHẬT: Thunk lấy TẤT CẢ xe (dùng API /user/vehicles)
 * Giờ đây trả về VehicleDetail[] (đã bao gồm pin)
 */
export const getAllVehicles = createAsyncThunk<
    VehicleDetail[],
    void, // Không cần payload
    { rejectValue: string }
>(
    "swapBattery/getAllVehicles", // ⚡️ Đổi tên action
    async (_, { rejectWithValue }) => {
        try {
            // Service đã được cập nhật để gọi /user/vehicles
            const response = await swapBatteryService.getAllVehicles();
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Lấy danh sách xe thất bại.";
            return rejectWithValue(errorMessage);
        }
    }
);

/**
 * ⛔️ ĐÃ XÓA: getBatteriesForVehicle
 * Logic này không cần nữa vì pin đã đi kèm với xe (từ API /user/vehicles).
 */

/**
 * Thunk lấy TẤT CẢ trạm (Không đổi)
 */
export const getAllStations = createAsyncThunk<
    StationDetail[],
    void,
    { rejectValue: string }
>(
    "swapBattery/getAllStations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await swapBatteryService.getAllStations();
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Lấy danh sách trạm thất bại.";
            return rejectWithValue(errorMessage);
        }
    }
);

/**
 * Thunk thực hiện SWAP (Không đổi)
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


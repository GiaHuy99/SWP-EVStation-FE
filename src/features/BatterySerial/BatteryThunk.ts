// src/features/battery/batteryThunks.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import BatteryServices from "./services/BatteryService";
import {
    Battery,
    BatteryListItem,
    CreateBatteryPayload,
    UpdateBatteryPayload
} from "./types/Battery";

/**
 * Thunk để tạo mới một viên pin.
 */
export const createBattery = createAsyncThunk<Battery, CreateBatteryPayload>(
    "battery/create",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await BatteryServices.createBatteryService(payload);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create battery");
        }
    }
);

/**
 * Thunk để lấy danh sách tất cả các viên pin.
 * Trả về kiểu `BatteryListItem[]` để tối ưu state.
 */
export const fetchBatteries = createAsyncThunk<BatteryListItem[]>(
    "battery/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await BatteryServices.getAll();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch batteries");
        }
    }
);

/**
 * Thunk để lấy thông tin chi tiết một viên pin bằng ID.
 * Trả về kiểu `Battery` đầy đủ.
 */
export const getBatteryById = createAsyncThunk<Battery, number>(
    "battery/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await BatteryServices.getBatteryById(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch battery details");
        }
    }
);



/**
 * Thunk để xóa một viên pin.
 * Trả về `id` của viên pin đã xóa để reducer có thể xử lý.
 */
export const deleteBattery = createAsyncThunk<number, number>(
    "battery/delete",
    async (id, { rejectWithValue }) => {
        try {
            await BatteryServices.delete(id);

            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete battery");
        }
    }
);
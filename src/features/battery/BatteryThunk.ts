// src/features/battery/BatteryThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {Battery, CreateBatteryPayload, UpdateBatteryPayload} from "./types/BatteryType";
import BatteryServices from "./services/BatteryServices";

export const createBattery = createAsyncThunk<Battery, CreateBatteryPayload>(
    "battery/createBattery",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await BatteryServices.createBatteryService(payload); // ✅ gọi đúng
            return res;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error creating battery");
        }
    }
);
export const fetchBatteries = createAsyncThunk<Battery[]>(
    "battery/fetchBatteries",
    async (_, { rejectWithValue }) => {
        try {
            return await BatteryServices.getAll();
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error fetching batteries");
        }
    }
);
export const getBatteryById = createAsyncThunk<Battery, number>(
    "battery/getBatteryById",
    async (id, { rejectWithValue }) => {
        try {
            return await BatteryServices.getBatteryById(id);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error fetching battery detail");
        }
    }
);
export const updateBattery = createAsyncThunk<Battery, UpdateBatteryPayload>(
    "battery/update",
    async (payload, { rejectWithValue }) => {
        try {
            return await BatteryServices.update(payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to update battery");
        }
    }
);
export const deleteBattery = createAsyncThunk<number, number>(
    "battery/deleteBattery",
    async (id, { rejectWithValue }) => {
        try {
            await BatteryServices.delete(id);
            return id; // trả về id đã xóa
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to delete battery");
        }
    }
);
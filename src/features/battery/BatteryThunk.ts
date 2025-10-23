// src/features/battery/BatteryThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {Battery, CreateBatteryPayload} from "./types/BatteryType";
import { BatteryMockService } from "./services/BatteryMockService";

export const createBattery = createAsyncThunk<Battery, CreateBatteryPayload>(
    "battery/createBattery",
    async (payload, { rejectWithValue }) => {
        try {
            return await BatteryMockService.create(payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error creating battery");
        }
    }
);
export const fetchBatteries = createAsyncThunk<Battery[]>(
    "battery/fetchBatteries",
    async (_, { rejectWithValue }) => {
        try {
            return await BatteryMockService.getAll();
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error fetching batteries");
        }
    }
);
export const getBatteryById = createAsyncThunk<Battery, number>(
    "battery/getBatteryById",
    async (id, { rejectWithValue }) => {
        try {
            return await BatteryMockService.getById(id);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error fetching battery detail");
        }
    }
);
export const updateBattery = createAsyncThunk<
    Battery, 
    { id: number; payload: Partial<CreateBatteryPayload> }
>(
    "battery/update",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            return await BatteryMockService.update(id, payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to update battery");
        }
    }
);
export const deleteBattery = createAsyncThunk<number, number>(
    "battery/deleteBattery",
    async (id, { rejectWithValue }) => {
        try {
            await BatteryMockService.delete(id);
            return id; // trả về id đã xóa
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to delete battery");
        }
    }
);
// src/features/battery/BatteryThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {BatteryType, CreateBatteryTypePayload} from "./types/BatteryType";
import  BatteryServices  from "./services/BatteryServices";

export const createBattery = createAsyncThunk<BatteryType, CreateBatteryTypePayload>(
    "battery/createBattery",
    async (payload, { rejectWithValue }) => {
        try {
            return await BatteryServices.createBatteryService(payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error creating battery");
        }
    }
);
export const fetchBatteries = createAsyncThunk<BatteryType[]>(
    "battery/fetchBatteries",
    async (_, { rejectWithValue }) => {
        try {
            return await BatteryServices.getAll();
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error fetching batteries");
        }
    }
);
export const getBatteryById = createAsyncThunk<BatteryType, number>(
    "battery/getBatteryById",
    async (id, { rejectWithValue }) => {
        try {
            return await BatteryServices.getBatteryById(id);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error fetching battery detail");
        }
    }
);
export const updateBattery = createAsyncThunk<
    BatteryType,
    { id: number; payload: Partial<CreateBatteryTypePayload> }
>(
    "battery/update",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            return await BatteryServices.update(id, payload);
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

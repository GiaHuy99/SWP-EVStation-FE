import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateBatteryPayload, Battery } from "./types/BatteryType";
import { BatteryMockService } from "./services/BatteryMockService";

// Create battery
export const createBattery = createAsyncThunk<
    Battery,
    CreateBatteryPayload,
    { rejectValue: string }
>("battery/createBattery", async (payload, { rejectWithValue }) => {
    try {
        return await BatteryMockService.create(payload);
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to create battery");
    }
});

// Fetch all batteries
export const fetchBatteries = createAsyncThunk<
    Battery[],
    void,
    { rejectValue: string }
>("battery/fetchAll", async (_, { rejectWithValue }) => {
    try {
        return await BatteryMockService.getAll();
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch batteries");
    }
});

// Get battery by ID
export const getBatteryById = createAsyncThunk<
    Battery,
    number,
    { rejectValue: string }
>("battery/getById", async (id, { rejectWithValue }) => {
    try {
        return await BatteryMockService.getById(id);
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch battery");
    }
});

// Update battery
export const updateBattery = createAsyncThunk<
    Battery,
    { id: number; payload: Partial<CreateBatteryPayload> },
    { rejectValue: string }
>("battery/updateBattery", async ({ id, payload }, { rejectWithValue }) => {
    try {
        return await BatteryMockService.update(id, payload);
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to update battery");
    }
});

// Delete battery
export const deleteBattery = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("battery/deleteBattery", async (id, { rejectWithValue }) => {
    try {
        await BatteryMockService.delete(id);
        return id;
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to delete battery");
    }
});
// src/features/batteryType/batteryTypeThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BatteryTypes, CreateBatteryTypePayload, UpdateBatteryTypePayload } from "././types/BatteryTypes";
import BatteryTypeServices from "./services/BatteryTypeServices";

// Create a new battery type
export const createBatteryType = createAsyncThunk<BatteryTypes, CreateBatteryTypePayload>(
    "batteryType/create",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await BatteryTypeServices.createBatteryService(payload);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error creating battery type");
        }
    }
);

// Fetch all battery types
export const fetchBatteryTypes = createAsyncThunk<BatteryTypes[]>(
    "batteryType/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await BatteryTypeServices.getAll();
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error fetching battery types");
        }
    }
);

// Get a single battery type by its ID
export const getBatteryTypeById = createAsyncThunk<BatteryTypes, number>(
    "batteryType/getById",
    async (id, { rejectWithValue }) => {
        try {
            return await BatteryTypeServices.getBatteryById(id);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Error fetching battery type detail");
        }
    }
);

// Update an existing battery type
export const updateBatteryType = createAsyncThunk<BatteryTypes, UpdateBatteryTypePayload>(
    "batteryType/update",
    async (payload, { rejectWithValue }) => {
        try {
            return await BatteryTypeServices.update(payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to update battery type");
        }
    }
);

// Delete a battery type
export const deleteBatteryType = createAsyncThunk<number, number>(
    "batteryType/delete",
    async (id, { rejectWithValue }) => {
        try {
            await BatteryTypeServices.delete(id);
            return id; // Return the deleted id for reducer logic
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to delete battery type");
        }
    }
);
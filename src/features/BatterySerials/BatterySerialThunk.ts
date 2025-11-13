// src/features/batterySerial/thunks/BatterySerialThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BatterySerial, CreateBatterySerialPayload } from "./types/BatterySerialTypes";
import BatterySerialServices from "./services/BatterySerialServices";

export const fetchBatterySerials = createAsyncThunk<BatterySerial[]>(
    "batterySerial/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await BatterySerialServices.getAll();
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Lỗi tải danh sách serial");
        }
    }
);

export const createBatterySerial = createAsyncThunk<BatterySerial, CreateBatterySerialPayload>(
    "batterySerial/create",
    async (payload, { rejectWithValue }) => {
        try {
            return await BatterySerialServices.create(payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Tạo serial thất bại");
        }
    }
);

export const updateBatterySerial = createAsyncThunk<
    BatterySerial,
    { id: number; payload: Partial<CreateBatterySerialPayload> }
>(
    "batterySerial/update",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            return await BatterySerialServices.update(id, payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Cập nhật thất bại");
        }
    }
);

export const deleteBatterySerial = createAsyncThunk<number, number>(
    "batterySerial/delete",
    async (id, { rejectWithValue }) => {
        try {
            await BatterySerialServices.delete(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Xóa thất bại");
        }
    }
);
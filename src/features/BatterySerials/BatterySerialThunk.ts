// src/features/batterySerial/thunks/BatterySerialThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {BatterySerial, CreateBatterySerialPayload, UpdateBatterySerialPayload} from "./types/BatterySerialTypes";
import BatterySerialServices from "./services/BatterySerialServices";
import axiosInstance from "../../shared/utils/AxiosInstance";

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
    { id: number; payload: UpdateBatterySerialPayload }
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
export const transferBattery = createAsyncThunk(
    "batterySerial/transfer",
    async (payload: {
        batteryId: number;
        fromStationId: number;
        toStationId: number;
        notes?: string;
    }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/admin/batteries/transfer", payload);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Chuyển pin thất bại");
        }
    }
);
export const updateBatterySoH = createAsyncThunk(
    "batterySerial/updateSoH",
    async ({ batteryId, newSoH }: { batteryId: number; newSoH: number }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`/admin/batteries/${batteryId}/soh`, { newSoH });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Cập nhật SoH thất bại");
        }
    }
);
// src/features/staff-swap/StaffSwapThunks.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchPendingSwapsApi,
    confirmSwapApi,
    rejectSwapApi,
} from "./services/ConfirmServices";
import { BatterySwapRecord } from "./types/ConfirmTypes";
import axiosInstance from "../../shared/utils/AxiosInstance";

export const fetchPendingSwaps = createAsyncThunk<BatterySwapRecord[]>(
    "staffSwap/fetchPending",
    async () => {
        return await fetchPendingSwapsApi();
    }
);

export const confirmSwap = createAsyncThunk<
    { message: string; id: number },
    number
>("staffSwap/confirm", async (id, { rejectWithValue }) => {
    try {
        const data = await confirmSwapApi(id);
        return { ...data, id };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Xác nhận thất bại");
    }
});

export const rejectSwap = createAsyncThunk<
    { message: string; id: number },
    number
>("staffSwap/reject", async (id, { rejectWithValue }) => {
    try {
        const data = await rejectSwapApi(id);
        return { ...data, id };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Từ chối thất bại");
    }
});
export const fetchBatteriesAtStation = createAsyncThunk(
    "staffBattery/fetchAtStation",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/staff/batteries");
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Lỗi tải danh sách pin");
        }
    }
);
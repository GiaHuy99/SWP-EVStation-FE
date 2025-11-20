// src/features/staff-swap/StaffSwapThunks.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchPendingSwapsApi,
    confirmSwapApi,
    rejectSwapApi,
} from "./services/ConfirmServices";
import { BatterySwapRecord } from "./types/ConfirmTypes";

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
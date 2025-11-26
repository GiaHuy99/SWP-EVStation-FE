import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getPendingReservationApi,
    confirmSwapApi,
    rejectSwapApi,
} from "./service/ConfirmReserveService";

export const fetchPendingReservations = createAsyncThunk(
    "reservationSwap/fetchPending",
    async (_, thunkAPI) => {
        try {
            const res = await getPendingReservationApi();
            console.log(res); // <-- thêm dòng này để kiểm tra
            return res; // hoặc res.data tùy API
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const confirmReservationSwap = createAsyncThunk(
    "reservationSwap/confirm",
    async (
        params: {
            transactionId: number;
            newBatterySerialId: number;
            endPercent: number;
        },
        thunkAPI
    ) => {
        try {
            const { transactionId, newBatterySerialId, endPercent } = params;
            return await confirmSwapApi(transactionId, {
                newBatterySerialId,
                endPercent,
            });
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const rejectReservationSwap = createAsyncThunk(
    "reservationSwap/reject",
    async (id: number, thunkAPI) => {
        try {
            return await rejectSwapApi(id);
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

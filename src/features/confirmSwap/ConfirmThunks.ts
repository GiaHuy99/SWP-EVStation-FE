// src/features/staff-swap/StaffSwapThunks.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchPendingSwapsApi,
    confirmSwapApi,
    rejectSwapApi, fetchReservationSwapsApi,
} from "./services/ConfirmServices";
import { BatterySwapRecord } from "./types/ConfirmTypes";
import axiosInstance from "../../shared/utils/AxiosInstance";

export const fetchPendingSwaps = createAsyncThunk<BatterySwapRecord[]>(
    "staffSwap/fetchPending",
    async () => {
        return await fetchPendingSwapsApi();
    }
);

// export const confirmSwap = createAsyncThunk<
//     { message: string; id: number },
//     number
// >("staffSwap/confirm", async (id, { rejectWithValue }) => {
//     try {
//         const data = await confirmSwapApi(id);
//         return { ...data, id };
//     } catch (error: any) {
//         return rejectWithValue(error.response?.data?.message || "Xác nhận thất bại");
//     }
// });
export const confirmSwap = createAsyncThunk<
    { message: string; id: number },
    { requestId: number; newBatteryId: number; endPercent: number }
>(
    "staffSwap/confirm",
    async ({ requestId, newBatteryId, endPercent }, { rejectWithValue }) => {
        try {
            const data = await confirmSwapApi(requestId, {
                newBatterySerialId: newBatteryId,
                endPercent,
            });
            return { ...data, id: requestId };
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Xác nhận thất bại"
            );
        }
    }
);


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
export const fetchReservationSwaps = createAsyncThunk<BatterySwapRecord[]>(
    "staffSwap/fetchReservation",
    async () => {
        const rawList = await fetchReservationSwapsApi();

        return rawList.map((r: any) => ({
            id: r.id,
            username: r.username || r.user?.username || "Khách lẻ",
            oldBatterySerialNumber: r.batterySerialNumber || "Chưa có",
            oldBatterySoH: r.batterySoH || r.battery?.stateOfHealth || 100,
            stationName: r.stationName || r.station?.name || "Trạm không xác định",
            timestamp: r.createdAt || r.reservedAt || new Date().toISOString(),
            status: "RESERVED" as const,
            type: "RESERVED",
            availableBatteries: [],
        }));
    }
);

export const fetchReservationBattery = createAsyncThunk<BatterySwapRecord[]>(
    "staffSwap/fetchReservationBattery",
    async () => {
        const rawList = await fetchReservationSwapsApi();

        return rawList.map((r) => ({
            id: r.reservationId,
            username: r.username,
            stationName: r.stationName,
            oldBatterySerialNumber: "Đặt trước", // hiển thị cho dễ nhận biết
            oldBatterySoH: 100,
            timestamp: r.reservedAt,
            reservedAt: r.reservedAt,
            remainingMinutes: r.remainingMinutes,
            status: "RESERVED" as const,
            type: "RESERVED" as const,
            availableBatteries: r.batteries.map((b) => ({
                id: b.batterySerialId,
                serialNumber: b.serialNumber,
                batteryModel: b.batteryModel,
                chargePercent: b.chargePercent,
                stateOfHealth: b.stateOfHealth,
                totalCycleCount: b.totalCycleCount,
            })),
        }));
    }
);
// features/reservation/thunks/reservationThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchStations,
    fetchAllBatterySerials,
    fetchUserVehicles,
    createReservation, fetchUserReservations, cancelReservation,
} from '../reservation/services/ReservationServices';

export const loadStations = createAsyncThunk(
    'reservation/loadStations',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchStations();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Lỗi tải trạm');
        }
    }
);

export const loadBatterySerials = createAsyncThunk(
    'reservation/loadBatterySerials',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchAllBatterySerials();
        } catch (err: any) {
            return rejectWithValue('Lỗi tải danh sách pin');
        }
    }
);

export const loadUserVehicles = createAsyncThunk(
    'reservation/loadUserVehicles',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchUserVehicles();
        } catch (err: any) {
            return rejectWithValue('Lỗi tải xe của bạn');
        }
    }
);

export const submitReservation = createAsyncThunk(
    'reservation/submitReservation',
    async (payload: { vehicleId: number; stationId: number; quantity: number; batteryIds: number[] }, { rejectWithValue }) => {
        try {
            const result = await createReservation(payload);
            return result;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Đặt pin thất bại');
        }
    }
);
export const loadUserReservations = createAsyncThunk(
    'reservation/loadUserReservations',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchUserReservations();
        } catch (err: any) {
            return rejectWithValue('Không tải được lịch sử đặt pin');
        }
    }
);

export const cancelReservationThunk = createAsyncThunk(
    'reservation/cancelReservation',
    async (reservationId: number, { rejectWithValue }) => {
        try {
            const result = await cancelReservation(reservationId);
            return { reservationId, result };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Hủy thất bại');
        }
    }
);
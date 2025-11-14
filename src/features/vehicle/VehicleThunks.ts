// src/features/vehicle/thunks/VehicleThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import VehicleModelService from "../vehicle/services/VehicleService";
import { Vehicle, CreateVehiclePayload, UpdateVehiclePayload } from "../vehicle/types/VehicleType";

export const createVehicle = createAsyncThunk<Vehicle, CreateVehiclePayload>(
    "vehicle/create",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await VehicleModelService.create(payload);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Tạo xe thất bại");
        }
    }
);

export const fetchVehicles = createAsyncThunk<Vehicle[]>(
    "vehicle/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const data = await VehicleModelService.getAll();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Lấy danh sách thất bại");
        }
    }
);

export const fetchVehicleById = createAsyncThunk<Vehicle, number>(
    "vehicle/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const data = await VehicleModelService.getById(id);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Không tìm thấy xe");
        }
    }
);

export const updateVehicle = createAsyncThunk<
    Vehicle,
    { id: number; payload: UpdateVehiclePayload }
>(
    "vehicle/update",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            const data = await VehicleModelService.update(id, payload);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Cập nhật thất bại");
        }
    }
);

export const deleteVehicle = createAsyncThunk<number, number>(
    "vehicle/delete",
    async (id, { rejectWithValue }) => {
        try {
            await VehicleModelService.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Xóa thất bại");
        }
    }
);
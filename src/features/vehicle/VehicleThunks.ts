import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleService } from "./services/VehicleService";
import { CreateVehiclePayload, Vehicle } from "./types/VehicleType";

export const createVehicle = createAsyncThunk(
    "vehicle/create",
    async (payload: CreateVehiclePayload, thunkAPI) => {
        try {
            const data: Vehicle = await VehicleService.create(payload);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Create failed");
        }
    }
);
export const fetchVehicles = createAsyncThunk<Vehicle[]>(
    "vehicle/fetchAll",
    async (_, thunkAPI) => {
        try {
            const data = await VehicleService.getAll();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch vehicles");
        }
    }
);
export const fetchVehicleById = createAsyncThunk<Vehicle, number>(
    "vehicle/fetchById",
    async (id, thunkAPI) => {
        try {
            const data = await VehicleService.getById(id);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch vehicle");
        }
    }
);

export const updateVehicle = createAsyncThunk<Vehicle, { id: number; payload: Partial<CreateVehiclePayload> }>(
    "vehicle/update",
    async ({ id, payload }, thunkAPI) => {
        try {
            const data = await VehicleService.update(id, payload);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
        }
    }
);

export const deleteVehicle = createAsyncThunk<number, number>(
    "vehicle/delete",
    async (id, thunkAPI) => {
        try {
            await VehicleService.delete(id);
            return id; // trả về id để xóa trong state
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Delete failed");
        }
    }
);

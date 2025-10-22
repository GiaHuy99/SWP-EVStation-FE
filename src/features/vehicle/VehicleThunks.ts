import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleMockService } from "./services/VehicleMockService";
import { CreateVehiclePayload, Vehicle } from "./types/VehicleMockType";

export const createVehicle = createAsyncThunk(
    "vehicle/create",
    async (payload: CreateVehiclePayload, thunkAPI) => {
        try {
            const data: Vehicle = await VehicleMockService.create(payload);
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
            const data = await VehicleMockService.getAll();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Fetch failed");
        }
    }
);


export const fetchVehicleById = createAsyncThunk<Vehicle, number>(
    "vehicle/fetchById",
    async (id, thunkAPI) => {
        try {
            const data = await VehicleMockService.getById(id);
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
            const data = await VehicleMockService.update(id, payload);
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
            await VehicleMockService.delete(id);
            return id; // trả về id để xóa trong state
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Delete failed");
        }
    }
);

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

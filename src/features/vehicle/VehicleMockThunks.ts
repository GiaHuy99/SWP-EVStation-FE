import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateVehiclePayload, Vehicle } from "./types/VehicleMockType";
import { VehicleMockService } from "./services/VehicleMockService";

// Create vehicle
export const createVehicle = createAsyncThunk<
    Vehicle,
    CreateVehiclePayload,
    { rejectValue: string }
>("vehicle/createVehicle", async (payload, { rejectWithValue }) => {
    try {
        return await VehicleMockService.create(payload);
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to create vehicle");
    }
});

// Fetch all vehicles
export const fetchVehicles = createAsyncThunk<
    Vehicle[],
    void,
    { rejectValue: string }
>("vehicle/fetchAll", async (_, { rejectWithValue }) => {
    try {
        return await VehicleMockService.getAll();
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch vehicles");
    }
});

// Get vehicle by ID
export const getVehicleById = createAsyncThunk<
    Vehicle,
    number,
    { rejectValue: string }
>("vehicle/getById", async (id, { rejectWithValue }) => {
    try {
        return await VehicleMockService.getById(id);
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch vehicle");
    }
});

// Update vehicle
export const updateVehicle = createAsyncThunk<
    Vehicle,
    { id: number; payload: CreateVehiclePayload },
    { rejectValue: string }
>("vehicle/updateVehicle", async ({ id, payload }, { rejectWithValue }) => {
    try {
        return await VehicleMockService.update(id, payload);
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to update vehicle");
    }
});

// Delete vehicle
export const deleteVehicle = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("vehicle/deleteVehicle", async (id, { rejectWithValue }) => {
    try {
        await VehicleMockService.delete(id);
        return id;
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to delete vehicle");
    }
});
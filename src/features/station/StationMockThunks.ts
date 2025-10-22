import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateStationPayload, Station } from "./types/StationMockType";
import { StationMockService } from "./services/StationMockService";

// Create station
export const createStation = createAsyncThunk<
    Station,
    CreateStationPayload,
    { rejectValue: string }
>("station/createStation", async (payload, { rejectWithValue }) => {
    try {
        return await StationMockService.create(payload);
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to create station");
    }
});

// Fetch all stations
export const fetchStations = createAsyncThunk<
    Station[],
    void,
    { rejectValue: string }
>("station/fetchAll", async (_, { rejectWithValue }) => {
    try {
        return await StationMockService.fetchAll();
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch stations");
    }
});

// Get station by ID
export const getStationById = createAsyncThunk<
    Station,
    number,
    { rejectValue: string }
>("station/getById", async (id, { rejectWithValue }) => {
    try {
        return await StationMockService.getById(id);
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch station");
    }
});

// Update station
export const updateStation = createAsyncThunk<
    Station,
    { id: number; payload: CreateStationPayload },
    { rejectValue: string }
>(
    "station/updateStation",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            return await StationMockService.update(id, payload);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to update station");
        }
    }
);

// Delete station
export const deleteStation = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(
    "station/deleteStation",
    async (id, { rejectWithValue }) => {
        try {
            await StationMockService.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to delete station");
        }
    }
);
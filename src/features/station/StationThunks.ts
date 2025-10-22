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

export const updateStationThunk = createAsyncThunk<
    Station,
    { id: number; payload: CreateStationPayload },
    { rejectValue: string }
>("station/updateStation", async ({ id, payload }, { rejectWithValue }) => {
    try {
        return await StationMockService.update(id, payload);
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to update station");
    }
});

export const deleteStation = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("station/deleteStation", async (id, { rejectWithValue }) => {
    try {
            await StationMockService.delete(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to delete station");
        }
    }
);

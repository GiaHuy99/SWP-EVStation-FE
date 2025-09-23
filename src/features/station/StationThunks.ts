import { createAsyncThunk } from "@reduxjs/toolkit";
import {CreateStationPayload, Station, UpdateStationPayload} from "./types/StationType";
import StationServices, {updateStation} from "./services/StationServices";
import { deleteStation as deleteStationService } from "./services/StationServices";

// Create station
export const createStation = createAsyncThunk<
    Station,
    CreateStationPayload,
    { rejectValue: string }
>("station/createStation", async (payload, { rejectWithValue }) => {
    try {
        return await StationServices.createStation(payload);
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to create station");
    }
});
export const fetchStations = createAsyncThunk<Station[]>(
    "stations/fetchAll",
    async () => {
        return await StationServices.getAll();
    }
);
export const getStationById = createAsyncThunk<
    Station,
    number,
    { rejectValue: string }
>("station/getById", async (id, { rejectWithValue }) => {
    try {
        return await StationServices.getStationById(id);
    } catch (err: any) {
        return rejectWithValue(err.message || "Failed to fetch station");
    }
});
export const updateStationThunk = createAsyncThunk<
    Station,
    UpdateStationPayload,
    { rejectValue: string }
>("station/updateStation", async (payload, { rejectWithValue }) => {
    try {
        return await updateStation(payload);
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Failed to update station");
    }
});

export const deleteStation = createAsyncThunk<number, number>(
    "station/deleteStation",
    async (id, { rejectWithValue }) => {
        try {
            await deleteStationService(id);
            return id; // trả về id đã xóa
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to delete station");
        }
    }
);

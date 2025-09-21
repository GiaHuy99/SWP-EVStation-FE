import { createAsyncThunk } from "@reduxjs/toolkit";
import {CreateStationPayload, Station} from "./types/StationType";
import StationServices from "./services/StationServices";


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


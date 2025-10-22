import { createAsyncThunk } from "@reduxjs/toolkit";
import LinkVehicleService from "./services/linkVehicleService";
import { LinkVehiclePayload, LinkedVehicleResponse } from "./types/LinkVehicleType";

export const linkVehicle = createAsyncThunk<
    LinkedVehicleResponse,
    LinkVehiclePayload,
    { rejectValue: string }
>("linkVehicle/link", async (payload, { rejectWithValue }) => {
    try {
        return await LinkVehicleService.linkVehicle(payload);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to link vehicle");
    }
});

export const fetchVehicles = createAsyncThunk<any[]>(
    "linkVehicle/fetchVehicles",
    async (_, { rejectWithValue }) => {
        try {
            return await LinkVehicleService.getVehicles();
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to fetch vehicles");
        }
    }
);

export const fetchPlans = createAsyncThunk<any[]>(
    "linkVehicle/fetchPlans",
    async (_, { rejectWithValue }) => {
        try {
            return await LinkVehicleService.getPlans();
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to fetch plans");
        }
    }
);

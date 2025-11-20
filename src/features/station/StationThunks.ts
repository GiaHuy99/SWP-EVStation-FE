import { createAsyncThunk } from "@reduxjs/toolkit";
import StationServices from "./services/StationServices";
import { Station } from "./types/StationType";

export const fetchStations = createAsyncThunk<
  Station[],
  void,
  { rejectValue: string }
>("station/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await StationServices.getStations();
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
    return await StationServices.getStationById(id);
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch station by id");
  }
});

export const createStation = createAsyncThunk<
  Station,
  Omit<Station, "id">,
  { rejectValue: string }
>("station/create", async (payload, { rejectWithValue }) => {
  try {
    return await StationServices.createStation(payload);
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to create station");
  }
});

export const updateStation = createAsyncThunk<
  Station,
  { id: number; payload: Partial<Station> },
  { rejectValue: string }
>("station/update", async ({ id, payload }, { rejectWithValue }) => {
  try {
    return await StationServices.updateStation(id, payload);
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to update station");
  }
});

export const deleteStation = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("station/delete", async (id, { rejectWithValue }) => {
  try {
    await StationServices.deleteStation(id);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to delete station");
  }
});

export const fetchAllSummaries = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("station/fetchAllSummaries", async (_, { rejectWithValue }) => {
  try {
    return await StationServices.getAllSummary();
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch summaries");
  }
});

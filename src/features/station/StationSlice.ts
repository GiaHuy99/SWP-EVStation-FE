import { Station, StationDetailState } from "./types/StationType";
import { createStation, deleteStation, fetchStations, getStationById, updateStationThunk } from "./StationThunks";
import { createSlice } from "@reduxjs/toolkit";

interface StationState {
    stations: Station[];
    selectedStation: Station | null;
    loading: boolean;
    error: string | null;
}

const initialState: StationState = {
    stations: [],
    selectedStation: null,
    loading: false,
    error: null,
};

const stationSlice = createSlice({
    name: "station",
    initialState,
    reducers: {
        clearSelectedStation(state) {
            state.selectedStation = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // create
            .addCase(createStation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStation.fulfilled, (state, action) => {
                state.loading = false;
                state.stations.push(action.payload);
            })
            .addCase(createStation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            // list
            .addCase(fetchStations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStations.fulfilled, (state, action) => {
                state.loading = false;
                state.stations = action.payload;
            })
            .addCase(fetchStations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch stations";
            })
            // getById
            .addCase(getStationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStationById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedStation = action.payload;
            })
            .addCase(getStationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch station by id";
            })
            // Update
            .addCase(updateStationThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.stations = state.stations.map((s) =>
                    s.id === action.payload.id ? action.payload : s
                );
            })
            .addCase(updateStationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Update failed";
            })
            // Delete
            .addCase(deleteStation.fulfilled, (state, action) => {
                state.stations = state.stations.filter(
                    (station) => station.id !== action.payload
                );
            });
    },
});

export const { clearSelectedStation } = stationSlice.actions;
export default stationSlice.reducer;

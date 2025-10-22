import { createSlice } from "@reduxjs/toolkit";
import { StationState } from "./types/StationMockType";
import {
    createStation,
    deleteStation,
    fetchStations,
    getStationById,
    updateStation
} from "./StationMockThunks";

const initialState: StationState = {
    stations: [],
    selectedStation: null,
    loading: false,
    error: null,
};

const stationMockSlice = createSlice({
    name: "stationMock",
    initialState,
    reducers: {
        clearSelectedStation: (state) => {
            state.selectedStation = null;
        }
    },
    extraReducers: (builder) => {
        // Create station
        builder
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
                state.error = action.payload || "Failed to create station";
            });

        // Fetch all stations
        builder
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
                state.error = action.payload || "Failed to fetch stations";
            });

        // Get station by ID
        builder
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
                state.error = action.payload || "Failed to fetch station";
            });

        // Update station
        builder
            .addCase(updateStation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStation.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.stations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.stations[index] = action.payload;
                }
                state.selectedStation = action.payload;
            })
            .addCase(updateStation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update station";
            });

        // Delete station
        builder
            .addCase(deleteStation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStation.fulfilled, (state, action) => {
                state.loading = false;
                state.stations = state.stations.filter(s => s.id !== action.payload);
                if (state.selectedStation?.id === action.payload) {
                    state.selectedStation = null;
                }
            })
            .addCase(deleteStation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete station";
            });
    },
});

export const { clearSelectedStation } = stationMockSlice.actions;
export default stationMockSlice.reducer;
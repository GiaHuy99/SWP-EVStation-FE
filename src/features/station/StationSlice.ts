import { createSlice } from "@reduxjs/toolkit";
import { Station } from "./types/StationType";
import {
  createStation,
  deleteStation,
  fetchStations,
  getStationById,
  updateStation,
  fetchAllSummaries,
} from "./StationThunks";

interface StationState {
  stations: Station[];
  summaries: any[];
  selectedStation: Station | null;
  loading: boolean;
  error: string | null;
}

const initialState: StationState = {
  stations: [],
  summaries: [],
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
      // 🔹 Fetch all
      .addCase(fetchStations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.loading = false;
        state.stations = action.payload;
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch stations";
      })
      // 🔹 Get by ID
      .addCase(getStationById.fulfilled, (state, action) => {
        state.selectedStation = action.payload;
      })
      // 🔹 Create
      .addCase(createStation.fulfilled, (state, action) => {
        state.stations.push(action.payload);
      })
      // 🔹 Update
      .addCase(updateStation.fulfilled, (state, action) => {
        state.stations = state.stations.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      // 🔹 Delete
      .addCase(deleteStation.fulfilled, (state, action) => {
        state.stations = state.stations.filter((s) => s.id !== action.payload);
      })
      // 🔹 Summary list
      .addCase(fetchAllSummaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.summaries = action.payload;
      })
      .addCase(fetchAllSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch summaries";
      });
  },
});

export const { clearSelectedStation } = stationSlice.actions;
export default stationSlice.reducer;

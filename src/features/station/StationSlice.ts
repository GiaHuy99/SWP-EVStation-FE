import {Station} from "./types/StationType";
import {createStation} from "./StationThunks";
import {createSlice} from "@reduxjs/toolkit";

interface StationState {
    stations: Station[];
    loading: boolean;
    error: string | null;
}

const initialState: StationState = {
    stations: [],
    loading: false,
    error: null,
};
const stationSlice = createSlice({
    name: "station",
    initialState,
    reducers: {},
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

    },
});

export default stationSlice.reducer;
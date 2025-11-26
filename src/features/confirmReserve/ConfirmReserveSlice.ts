import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPendingReservations,
    confirmReservationSwap,
    rejectReservationSwap,
} from "./ConfirmReserveThunks";

const initialState = {
    reservations: [],
    loading: false,
    error: null as string | null,
};

const reservationSwapSlice = createSlice({
    name: "reservationSwap",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch list
            .addCase(fetchPendingReservations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPendingReservations.fulfilled, (state, action) => {
                state.loading = false;
                state.reservations = action.payload;
            })
            .addCase(fetchPendingReservations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // confirm
            .addCase(confirmReservationSwap.fulfilled, (state, action) => {
                state.reservations = state.reservations.filter(
                    (r: any) => r.id !== action.meta.arg.transactionId
                );
            })

            // reject
            .addCase(rejectReservationSwap.fulfilled, (state, action) => {
                state.reservations = state.reservations.filter(
                    (r: any) => r.id !== action.meta.arg
                );
            });
    },
});

export default reservationSwapSlice.reducer;

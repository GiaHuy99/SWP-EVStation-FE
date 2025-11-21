// features/reservation/slices/reservationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BatterySerial, Station, UserVehicle, ReservationState,Reservation } from './types/reservationTypes';
import {
    loadStations,
    loadBatterySerials,
    loadUserVehicles,
    submitReservation,
    cancelReservationThunk, loadUserReservations
} from './reservationThunk';

const initialState: ReservationState = {
    stations: [],
    allBatterySerials: [],
    availableBatteries: [],
    vehicles: [],

    selectedStationId: null,
    selectedVehicle: null,
    quantity: 1,
    selectedBatteryIds: [],

    reservation: null,
    countdown: 0,

    loading: false,
    loadingStations: false,
    loadingBatteries: false,
    loadingVehicles: false,
    error: null,
    reservations: [] as Reservation[],
    loadingReservations: false,
    cancellingId: null as number | null,
};

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        setSelectedStation: (state, action: PayloadAction<number | null>) => {
            state.selectedStationId = action.payload;
            state.selectedBatteryIds = []; // reset khi đổi trạm
        },
        setSelectedVehicle: (state, action: PayloadAction<UserVehicle | null>) => {
            state.selectedVehicle = action.payload;
        },
        setQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload;
            state.selectedBatteryIds = state.selectedBatteryIds.slice(0, action.payload);
        },
        toggleBatterySelection: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            if (state.selectedBatteryIds.includes(id)) {
                state.selectedBatteryIds = state.selectedBatteryIds.filter(x => x !== id);
            } else if (state.selectedBatteryIds.length < state.quantity) {
                state.selectedBatteryIds.push(id);
            }
        },
        startCountdown: (state, action: PayloadAction<number>) => {
            state.countdown = action.payload;
        },
        decrementCountdown: (state) => {
            if (state.countdown > 0) state.countdown -= 1;
        },
        resetReservation: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Load Stations
            .addCase(loadStations.pending, (state) => { state.loadingStations = true; })
            .addCase(loadStations.fulfilled, (state, action) => {
                state.loadingStations = false;
                state.stations = action.payload;
            })
            .addCase(loadStations.rejected, (state, action) => {
                state.loadingStations = false;
                state.error = action.payload as string;
            })

            // Load Battery Serials
            .addCase(loadBatterySerials.pending, (state) => { state.loadingBatteries = true; })
            .addCase(loadBatterySerials.fulfilled, (state, action) => {
                state.loadingBatteries = false;
                state.allBatterySerials = action.payload;
                state.availableBatteries = action.payload.filter(
                    b => b.status === 'AVAILABLE' && b.stationId !== null
                );
            })

            // Load Vehicles
            .addCase(loadUserVehicles.pending, (state) => { state.loadingVehicles = true; })
            .addCase(loadUserVehicles.fulfilled, (state, action) => {
                state.loadingVehicles = false;
                state.vehicles = action.payload;
                if (action.payload.length > 0 && !state.selectedVehicle) {
                    state.selectedVehicle = action.payload[0];
                }
            })

            // Submit Reservation
            .addCase(submitReservation.pending, (state) => { state.loading = true; })
            .addCase(submitReservation.fulfilled, (state, action) => {
                state.loading = false;
                state.reservation = action.payload;
                state.countdown = action.payload.remainingMinutes || 59;
            })
            .addCase(submitReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loadUserReservations.pending, (state) => {
            state.loadingReservations = true;
        })
            .addCase(loadUserReservations.fulfilled, (state, action) => {
                state.loadingReservations = false;
                state.reservations = action.payload;
            })
            .addCase(loadUserReservations.rejected, (state) => {
                state.loadingReservations = false;
            })

            .addCase(cancelReservationThunk.pending, (state, action) => {
                state.cancellingId = action.meta.arg;
            })
            .addCase(cancelReservationThunk.fulfilled, (state, action) => {
                state.cancellingId = null;
                state.reservations = state.reservations.map(r =>
                    r.reservationId === action.payload.reservationId
                        ? { ...r, status: 'CANCELLED', cancelReason: 'Người dùng hủy' }
                        : r
                );
            });
    },
});

export const {
    setSelectedStation,
    setSelectedVehicle,
    setQuantity,
    toggleBatterySelection,
    decrementCountdown,
    resetReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;
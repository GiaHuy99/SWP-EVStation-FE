// src/features/staff/staffSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Staff } from './types/StaffTypes';
import { getStaffList, editStaff, fetchStations } from './StaffManagementThunk';
import { Station } from "@/src/features/map/types/stationTypes";

interface StaffState {
    staffList: Staff[];      // ← tên field đúng
    stations: Station[];     // ← tên field đúng
    loading: boolean;
    modalOpen: boolean;
    editingStaff: Staff | null;
    error?: string;
}

const initialState: StaffState = {
    staffList: [],
    stations: [],
    loading: false,
    modalOpen: false,
    editingStaff: null,
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Staff | null>) => {
            state.modalOpen = true;
            state.editingStaff = action.payload;
        },
        closeModal: (state) => {
            state.modalOpen = false;
            state.editingStaff = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Nhân viên
            .addCase(getStaffList.pending, (state) => { state.loading = true; })
            .addCase(getStaffList.fulfilled, (state, action) => {
                state.loading = false;
                state.staffList = action.payload;  // ← lưu vào staffList
            })
            .addCase(getStaffList.rejected, (state) => { state.loading = false; })

            // Gán trạm
            .addCase(editStaff.fulfilled, (state, action) => {
                const index = state.staffList.findIndex(s => s.id === action.payload.id);
                if (index !== -1) state.staffList[index] = action.payload;
            })

            // Trạm
            .addCase(fetchStations.pending, (state) => { state.loading = true; })
            .addCase(fetchStations.fulfilled, (state, action) => {
                state.loading = false;
                state.stations = action.payload;   // ← lưu vào stations
            })
            .addCase(fetchStations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { openModal, closeModal } = staffSlice.actions;
export default staffSlice.reducer;
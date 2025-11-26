// src/features/staff/staffThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchStaffList,
    updateStaff,

} from '../staffManagement/services/staffService';
import { Staff,   CreateStaffRequest,
    UpdateStaffRequest, } from '../staffManagement/types/StaffTypes';
import StationServices from "../station/services/StationServices";
import {Station} from "../station/types/StationType";

export const getStaffList = createAsyncThunk<Staff[]>(
    'staff/getList',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchStaffList();
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Lỗi tải danh sách');
        }
    }
);



export const editStaff = createAsyncThunk<Staff, { id: number; data: UpdateStaffRequest }>(
    'staff/assign-station',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            return await updateStaff(id, data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Cập nhật thất bại');
        }
    }
);
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


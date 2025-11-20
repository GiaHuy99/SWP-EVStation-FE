// src/features/profile/ProfileThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfileApi, updateUserProfileApi } from "./services/profileService";
import { UserProfile, UpdateProfileRequest } from "./types/ProfileType";

export const fetchUserProfile = createAsyncThunk<UserProfile>(
    "profile/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchUserProfileApi();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Lỗi tải thông tin");
        }
    }
);

export const updateProfile = createAsyncThunk<UserProfile, UpdateProfileRequest>(
    "profile/update",
    async (data, { rejectWithValue }) => {
        try {
            return await updateUserProfileApi(data);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Cập nhật thất bại");
        }
    }
);
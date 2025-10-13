import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../user/services/UserService";
import { UpdateUserPayload } from "../user/types/UserType";


export {};
export const getUserById = createAsyncThunk(
    "user/getById",
    async (id: string, { rejectWithValue }) => {
        try {
            return await UserService.getById(id);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error fetching user");
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async (payload: UpdateUserPayload, { rejectWithValue }) => {
        try {
            return await UserService.updateProfile(payload);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error updating user");
        }
    }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "./services/UserService";
import { User, CreateUserPayload, UpdateUserPayload } from "./types/UserType";

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    "user/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            return await UserService.getAllUsers();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Lỗi khi tải danh sách người dùng");
        }
    }
);

export const createUser = createAsyncThunk<User, CreateUserPayload, { rejectValue: string }>(
    "user/createUser",
    async (payload, { rejectWithValue }) => {
        try {
            return await UserService.createUser(payload);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Lỗi khi tạo người dùng");
        }
    }
);

export const updateUser = createAsyncThunk<User, { id: number; payload: UpdateUserPayload }, { rejectValue: string }>(
    "user/updateUser",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            return await UserService.updateUser(id, payload);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Lỗi khi cập nhật người dùng");
        }
    }
);

export const deleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            await UserService.deleteUser(userId);
            return userId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Lỗi khi xóa người dùng");
        }
    }
);

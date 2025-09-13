import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./services/authService";
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "./types/authTypes";

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            return await AuthService.login(credentials);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);
export const register = createAsyncThunk<RegisterResponse, RegisterRequest>(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            return await AuthService.register(data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Register failed");
        }
    }
);

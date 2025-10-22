import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./services/AuthService";
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "./types/AuthTypes";

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            return await AuthService.login(credentials);
        } catch (error: any) {
            return rejectWithValue("Sai mật khẩu hoặc username");
        }
    }
);
export const register = createAsyncThunk<RegisterResponse, RegisterRequest>(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            return await AuthService.register(data);
        } catch (error: any) {
            return rejectWithValue( "Password phải có ít nhất 6 ký tự, chứa ít nhất 1 số và 1 ký tự đặc biệt");
        }
    }
);

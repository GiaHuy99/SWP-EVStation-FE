import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./services/AuthService";
import { LoginRequest, RegisterRequest, RegisterResponse } from "./types/AuthTypes";
import { jwtDecode } from "jwt-decode";
import { scheduleTokenRefresh } from "../../shared/utils/AxiosInstance"; // 👈 import thêm

interface JwtPayload {
    sub: string;
    role: string;
    iat: number;
    exp: number;
}

type LoginSuccessPayload = {
    token: string;
    username: string;
    role: string;
};

export const login = createAsyncThunk<LoginSuccessPayload, LoginRequest>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(credentials);
            const token = response.accessToken;

            const decoded = jwtDecode<JwtPayload>(token);
            const username = decoded.sub;
            const role = decoded.role;

            // ✅ Lưu accessToken + thông tin người dùng
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("role", role);

            // ✅ Bắt đầu auto-refresh accessToken
            scheduleTokenRefresh(token);

            return { token, username, role };
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "Sai tên đăng nhập hoặc mật khẩu";
            return rejectWithValue(errorMessage);
        }
    }
);

export const register = createAsyncThunk<RegisterResponse, RegisterRequest>(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            return await AuthService.register(data);
        } catch (error: any) {
            return rejectWithValue(
                "Password phải có ít nhất 6 ký tự, chứa ít nhất 1 số và 1 ký tự đặc biệt"
            );
        }
    }
);

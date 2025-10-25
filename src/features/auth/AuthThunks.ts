import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./services/AuthService";
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "./types/AuthTypes";
import { jwtDecode } from "jwt-decode"; // <-- 1. IMPORT

interface JwtPayload {
    sub: string; // Thường là username
    role: string; // Đây là trường chúng ta cần
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
            const { token, username } = response;

            // 4. GIẢI MÃ TOKEN VÀ LẤY ROLE
            const decodedToken = jwtDecode<JwtPayload>(token);
            const role = decodedToken.role;

            // 5. TRẢ VỀ PAYLOAD HOÀN CHỈNH
            return { token, username, role };

        } catch (error: any) {
            // 6. Cải thiện xử lý lỗi: trả về lỗi từ API thay vì chuỗi cứng
            const errorMessage = error.response?.data?.message || "Sai tên đăng nhập hoặc mật khẩu";
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
            return rejectWithValue( "Password phải có ít nhất 6 ký tự, chứa ít nhất 1 số và 1 ký tự đặc biệt");
        }
    }
);

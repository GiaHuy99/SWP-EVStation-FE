// src/features/auth/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types/AuthTypes"; // Đảm bảo AuthState có 'role'
import { login, register } from "./AuthThunks";
import AuthService from "./services/AuthService";
import { jwtDecode } from "jwt-decode";

// Tái sử dụng interface đã định nghĩa ở thunk
interface JwtPayload {
    sub: string;
    role: string;
    iat: number;
    exp: number;
}

// Hàm helper để lấy state từ localStorage một cách an toàn
const getInitialAuthState = (): AuthState => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            // Kiểm tra token hết hạn
            if (decodedToken.exp * 1000 > Date.now()) {
                return {
                    token,
                    username,
                    role: decodedToken.role, // <-- Lấy role từ token khi tải lại trang
                    loading: false,
                    error: null,
                    registerSuccess: false,
                };
            }
        } catch (error) {
            // Token không hợp lệ, xóa đi
            AuthService.logout();
        }
    }

    return { // <-- State mặc định nếu không có token hợp lệ
        token: null,
        username: null,
        role: null,
        loading: false,
        error: null,
        registerSuccess: false,
    };
};


const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.role = null; // <-- Xóa role khi logout
            AuthService.logout();
        },
        // 'loadFromStorage' không còn cần thiết vì initialState đã xử lý
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Sửa action payload để nhận kiểu dữ liệu mới từ thunk
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.role = action.payload.role; // <-- LƯU ROLE VÀO STATE

                // Chỉ lưu token và username vào localStorage
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("username", action.payload.username);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.token = null;
                state.username = null;
                state.role = null; // <-- Xóa role khi login thất bại
            });

        // Giữ nguyên register cases...
    },
});

export const selectIsLoggedIn = (state: { auth: AuthState }) => !!state.auth.token;
// Thêm selector để lấy role
export const selectUserRole = (state: { auth: AuthState }) => state.auth.role;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
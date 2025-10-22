import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse, RegisterResponse } from "./types/AuthTypes";
import { login, register } from "./AuthThunks";
import AuthService from "./services/AuthService";

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    loading: false,
    error: null,
    registerSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.username = null;
            AuthService.logout(); // Xóa localStorage
        },
        loadFromStorage: (state) => {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("username");
            if (token) state.token = token;
            if (username) state.username = username;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.username = action.payload.username;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("username", action.payload.username);
            })
            .addCase(login.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload as string; // Lấy lỗi backend, sửa trùng lặp
            });
        // Register cases
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.registerSuccess = false;
        });
        builder.addCase(register.fulfilled, (state, action: PayloadAction<RegisterResponse>) => { // Sửa type cho nhất quán
            state.loading = false;
            state.registerSuccess = true;
        });
        builder.addCase(register.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload as string;
            state.registerSuccess = false;
        });
    },
});

// Thêm selector để check login state (dùng trong Navbar)
export const selectIsLoggedIn = (state: { auth: AuthState }) => !!state.auth.token;

export const { logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
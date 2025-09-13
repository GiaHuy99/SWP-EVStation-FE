import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {AuthState, LoginResponse, RegisterResponse} from "./types/authTypes";
import {login, register} from "./authThunks";
import AuthService from "./services/authService";

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.username = null;
            AuthService.logout();
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
                state.error = action.payload;
            });
        // register
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action: { payload: RegisterResponse }) => {
            state.loading = false;
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("username", action.payload.username);
        });
        builder.addCase(register.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },



});

export const { logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;

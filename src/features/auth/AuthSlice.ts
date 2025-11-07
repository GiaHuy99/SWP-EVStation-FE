import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types/AuthTypes";
import { login, register } from "./AuthThunks";
import AuthService from "./services/AuthService";

const getInitialAuthState = (): AuthState => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
        return {
            token,
            username,
            role,
            loading: false,
            error: null,
            registerSuccess: false,
        };
    }

    return {
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
            state.role = null;
            AuthService.logout(); // ✅ gọi FE logout + clear refresh timer
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.role = action.payload.role;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.token = null;
                state.username = null;
                state.role = null;
            });
    },
});

export const selectIsLoggedIn = (state: { auth: AuthState }) => !!state.auth.token;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.role;

export const { logout } = authSlice.actions;
export default authSlice.reducer;

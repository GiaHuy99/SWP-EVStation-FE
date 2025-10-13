import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/types/UserType";

import { getUserById, updateUserProfile } from "./UserThunks";

interface UserState {
    user?: User;
    loading: boolean;
    error?: string;
}

const initialState: UserState = {
    user: undefined,
    loading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = undefined;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
export {};

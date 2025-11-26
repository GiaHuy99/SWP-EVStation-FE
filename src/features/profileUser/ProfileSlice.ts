// src/features/profile/ProfileSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateProfile, fetchUserVehicles } from "./ProfileThunks";
import { UserProfile } from "./types/ProfileType";
import { RootState } from "../../app/Store";

interface ProfileState {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
    successMessage: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearMessages(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchUserProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
            .addCase(fetchUserProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

            .addCase(updateProfile.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null; })
            .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; state.successMessage = "Cập nhật thông tin thành công!"; })
            .addCase(updateProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

            .addCase(fetchUserVehicles.fulfilled, (state, action) => {
                if (state.profile) {
                    state.profile.vehicles = action.payload;
                }
            })
            .addCase(fetchUserVehicles.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearMessages } = profileSlice.actions;
export default profileSlice.reducer;
export const selectProfile = (state: RootState) => state.profile.profile;

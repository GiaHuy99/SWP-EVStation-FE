import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types/UserType";
import { fetchUsers, createUser, updateUser, deleteUser } from "./UserThunks";

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create User
        builder
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Update User
        builder
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                const index = state.users.findIndex((u) => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Delete User
        builder
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
                state.users = state.users.filter((u) => u.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;

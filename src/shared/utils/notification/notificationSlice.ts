// src/features/notification/notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Notification = {
    message: string;
    type: "success" | "error" | "info" | "warning";
};

interface NotificationState {
    open: boolean;
    notification: Notification | null;
}

const initialState: NotificationState = {
    open: false,
    notification: null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<Notification>) => {
            state.open = true;
            state.notification = action.payload;
        },
        hideNotification: (state) => {
            state.open = false;
            state.notification = null;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

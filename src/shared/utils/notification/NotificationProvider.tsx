// src/features/notification/NotificationProvider.tsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { hideNotification } from "./notificationSlice";

const NotificationProvider: React.FC = () => {
    const dispatch = useAppDispatch();
    const { open, notification } = useAppSelector((state) => state.notification);

    // Nếu không có notification thì không render gì
    if (!notification) return null;

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => dispatch(hideNotification())}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                severity={notification.type} // ✅ dùng type từ state
                onClose={() => dispatch(hideNotification())}
            >
                {notification.message}
            </MuiAlert>
        </Snackbar>
    );
};

export default NotificationProvider;

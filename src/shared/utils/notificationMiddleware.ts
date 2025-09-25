import { Middleware } from "@reduxjs/toolkit";
import { showNotification } from "./notificationSlice";

function isReduxAction(action: unknown): action is { type: string } {
    return typeof (action as any).type === "string";
}

export const notificationMiddleware: Middleware =
    (store) => (next) => (action) => {
        if (isReduxAction(action)) {
            if (action.type.endsWith("/fulfilled")) {
                store.dispatch(
                    showNotification({ message: "Thành công!", type: "success" })
                );
            }

            if (action.type.endsWith("/rejected")) {
                store.dispatch(
                    showNotification({ message: "Thất bại!", type: "error" })
                );
            }
        }

        return next(action);
    };

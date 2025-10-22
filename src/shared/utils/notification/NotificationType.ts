// src/features/notification/types.ts
export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
    message: string;
    type: NotificationType;
}

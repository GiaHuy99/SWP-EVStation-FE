// src/features/staff/types.ts
export interface Staff {
    id: number;
    username: string;
    email: string;
    phone: string | null;
    address: string | null;
    role: "STAFF";
    assignedStationId: number;
    assignedStationName: string;
}

export interface CreateStaffRequest {
    username: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    assignedStationId: number;
}

export interface UpdateStaffRequest {
    username?: string;
    email?: string;
    phone?: string | null;
    address?: string | null;
    assignedStationId?: number;
}
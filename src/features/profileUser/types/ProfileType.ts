// src/features/profile/types/ProfileType.ts
export interface UserProfile {
    username: string;
    email: string;
    phone: string | null;
    address: string | null;
}

export interface UpdateProfileRequest {
    phone?: string;
    address?: string;
}
// src/features/profile/types/ProfileType.ts
export interface BatteryDetail {
    id: number;
    serialNumber: string;
    batteryName: string;
    stateOfHealth?: number;
    chargePercent?: number;
}

export interface VehicleDetail {
    id: number;
    vehicleName: string;
    currentPlan: string;
    batteries: BatteryDetail[];
}

export interface UserProfile {
    username: string;
    email: string;
    phone: string | null;
    address: string | null;
    vehicles?: VehicleDetail[];  // thêm vehicles
}

export interface UpdateProfileRequest {
    phone?: string;
    address?: string;
}

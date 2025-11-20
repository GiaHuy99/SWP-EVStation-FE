// src/features/batteryType/types/BatteryTypeTypes.ts
export interface BatteryType {
    id: number;
    name: string;
    type: string; // Scooter, Bike, ...
    designCapacity: number; // Ah hoặc Wh
    description: string | null;
    createdAt: string; // ISO string
}

export interface CreateBatteryTypePayload {
    name: string;
    type: string;
    designCapacity: number;
    description?: string;
}

export interface UpdateBatteryTypePayload {
    id: number;
    payload: Partial<CreateBatteryTypePayload>;
}

export interface BatteryTypeState {
    batteryTypes: BatteryType[];
    selectedBatteryType: BatteryType | null;
    loading: boolean;
    error: string | null;
}


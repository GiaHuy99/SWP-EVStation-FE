export interface Station {
    id: number;
    name: string;
    location: string;
    status: "ACTIVE" | "INACTIVE";
    capacity: number;
    phone: string;
    latitude?: number;
    longitude?: number;
}

export interface CreateStationPayload {
    name: string;
    location: string;
    status: "ACTIVE" | "INACTIVE";
    capacity: number;
    phone: string;
    latitude?: number;
    longitude?: number;
}

export interface StationState {
    stations: Station[];
    selectedStation: Station | null;
    loading: boolean;
    error: string | null;
}
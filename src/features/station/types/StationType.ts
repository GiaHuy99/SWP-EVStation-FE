export interface Station {
    id: number;
    name: string;
    location: string;
    status: "ACTIVE" | "INACTIVE"; // can extend later
    capacity: number;
    phone: string;
    latitude: number;
    longitude: number;
}

export interface CreateStationPayload {
    name: string;
    location: string;
    status: "ACTIVE" | "INACTIVE";
    capacity: number;
    phone: string;
    latitude: number;
    longitude: number;
}
export interface StationDetailState {
    station: Station | null;
    loading: boolean;
    error: string | null;
}
export interface UpdateStationPayload {
    name?: string;
    location?: string;
    status?: "ACTIVE" | "INACTIVE";
    capacity?: number;
    phone?: string;
    latitude?: number;
    longitude?: number;
}
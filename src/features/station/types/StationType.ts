export interface Station {
    id: number;
    name: string;
    location: string;
    status: "ACTIVE" | "INACTIVE"; // can extend later
    capacity: number;
    phone: string;
}

export interface CreateStationPayload {
    name: string;
    location: string;
    status: "ACTIVE" | "INACTIVE";
    capacity: number;
    phone: string;
}
export interface StationDetailState {
    station: Station | null;
    loading: boolean;
    error: string | null;
}
export interface UpdateStationPayload {
    id: number;
    name: string;
    location: string;
    status: "ACTIVE" | "INACTIVE";
    capacity: number;
    phone: string;
}
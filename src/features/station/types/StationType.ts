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
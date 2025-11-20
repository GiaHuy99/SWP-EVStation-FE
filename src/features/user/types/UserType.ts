export interface User {
    id: number;
    username: string;
    email: string;
    phone: string | null;
    address: string | null;
    role: "ADMIN" | "STAFF" | "USER";
}

export interface CreateUserPayload {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserPayload {
    phone?: string;
    address?: string;
    role?: "ADMIN" | "STAFF" | "USER";
}

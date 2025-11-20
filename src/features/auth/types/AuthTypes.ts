export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface AuthState {
    token: string | null;
    username: string | null;
    role: string | null;
    loading: boolean;
    error: string | null;
    registerSuccess?: boolean;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    username: string;
    message: string;
    role: string;
    token: string;
}

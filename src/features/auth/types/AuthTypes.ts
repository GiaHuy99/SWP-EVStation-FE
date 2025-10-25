export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    username: string;
}

export interface AuthState {
    token: string | null;
    username: string | null;
    role: string | null; // <-- THÊM DÒNG NÀY
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
import axiosInstance from "../../../shared/utils/axiosInstance";
import { LoginRequest, LoginResponse } from "../types/authTypes";
import { RegisterRequest, RegisterResponse } from "../types/authTypes";

class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await axiosInstance.post<LoginResponse>(
            "/auth/login",
            credentials
        );
        return response.data;
    }
    async register(data: RegisterRequest): Promise<RegisterResponse> {
        const response = await axiosInstance.post<RegisterResponse>(
            "/auth/register",
            data
        );
        return response.data;
    }

    logout(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }
}

export default new AuthService();

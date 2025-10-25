import axiosInstance from "../../../shared/utils/AxiosInstance";
import { LoginRequest, LoginResponse } from "../types/AuthTypes";
import { RegisterRequest, RegisterResponse } from "../types/AuthTypes";

class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        // chỉ gọi API, không try/catch
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
        localStorage.removeItem("role");
    }
}

export default new AuthService();

import axiosInstance, { scheduleTokenRefresh, clearTokenRefresh } from "../../../shared/utils/AxiosInstance";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/AuthTypes";
import { jwtDecode } from "jwt-decode";

class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
        const { accessToken } = response.data;

        // Lưu accessToken ở localStorage
        localStorage.setItem("token", accessToken);

        // Giải mã và setup refresh
        scheduleTokenRefresh(accessToken);

        return response.data;
    }

    async register(data: RegisterRequest): Promise<RegisterResponse> {
        const response = await axiosInstance.post<RegisterResponse>("/auth/register", data);
        return response.data;
    }

    async logout(): Promise<void> {
        try {
            // 🔹 Hủy interval auto-refresh
            clearTokenRefresh();

            // 🔹 Xóa token trong localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("role");

            // 🔹 Chuyển hướng về trang login
            window.location.href = "/login";
        } catch (err) {
            console.error("Lỗi logout:", err);
        }
    }
}

export default new AuthService();

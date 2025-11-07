import axiosInstance from "../../../shared/utils/AxiosInstance";
import { LoginRequest, LoginResponse } from "../types/AuthTypes";
import { RegisterRequest, RegisterResponse } from "../types/AuthTypes";

class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await axiosInstance.post<LoginResponse>(
            "/auth/login",
            credentials
        );
        return response.data; // ✅ backend trả { accessToken: "..." }
    }

    async register(data: RegisterRequest): Promise<RegisterResponse> {
        const response = await axiosInstance.post<RegisterResponse>(
            "/auth/register",
            data
        );
        return response.data;
    }

    /**
     * 🔹 Cập-nhật-hàm-logout
     * Phải-gọi-API-để-backend-xóa-HttpOnly-cookie
     */
    async logout(): Promise<void> {
        try {
            // 🔹 Gửi-yêu-cầu-lên-server-để-xóa-cookie-refreshToken
            await axiosInstance.post("/auth/logout");
        } catch (error) {
            console.error("Lỗi khi gọi API logout:", error);
            // Kể-cả-khi-lỗi, vẫn-tiếp-tục-xóa-dữ-liệu-phía-client
        } finally {
            // 🔹 Luôn-xóa-dữ-liệu-ở-localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("role");
        }
    }
}

export default new AuthService();
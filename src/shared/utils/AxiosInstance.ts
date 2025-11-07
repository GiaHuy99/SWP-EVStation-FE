import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";

// Interface
interface RefreshTokenResponse {
    accessToken: string;
}

// 🔹 Tạo instance axios
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // ⚠️ Bắt buộc để gửi cookie HttpOnly (refreshToken)
});

// -------------------- REQUEST INTERCEPTOR --------------------
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const noAuthPaths = ["/auth/login", "/auth/register", "/auth/refresh"];

        // Không chèn token cho các route login/register/refresh
        if (token && !noAuthPaths.some((path) => config.url?.includes(path))) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// -------------------- REFRESH TOKEN HANDLER --------------------
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token as string);
    });
    failedQueue = [];
};

// 👉 Hàm gọi refresh token
export const callRefreshToken = async (): Promise<string> => {
    const res = await axios.post<RefreshTokenResponse>(
        "http://localhost:8080/api/auth/refresh",
        {},
        {
            withCredentials: true, // ⚠️ quan trọng – gửi cookie refreshToken
        }
    );

    const newAccessToken = res.data.accessToken;
    localStorage.setItem("token", newAccessToken);
    return newAccessToken;
};

// -------------------- AUTO REFRESH --------------------
let refreshIntervalId: NodeJS.Timeout | null = null;

export const scheduleTokenRefresh = (token: string) => {
    try {
        const decoded: any = jwtDecode(token);
        const expiresIn = decoded.exp * 1000 - Date.now(); // còn bao lâu hết hạn
        const refreshTime = expiresIn - 30_000; // refresh trước 30s

        if (refreshIntervalId) clearTimeout(refreshIntervalId);

        refreshIntervalId = setTimeout(async () => {
            try {
                const newToken = await callRefreshToken();
                scheduleTokenRefresh(newToken); // đặt lại timer
                console.log("🔁 Access token refreshed tự động");
            } catch (err) {
                console.error("❌ Auto refresh thất bại:", err);
                localStorage.clear();
                window.location.href = "/login";
            }
        }, Math.max(refreshTime, 10_000)); // tối thiểu 10s để tránh giá trị âm
    } catch (e) {
        console.error("Không decode được token:", e);
    }
};

// 🔹 Hủy auto refresh khi logout
export const clearTokenRefresh = () => {
    if (refreshIntervalId) clearTimeout(refreshIntervalId);
};

// -------------------- RESPONSE INTERCEPTOR --------------------
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Nếu 401 -> cố gắng refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang refresh, xếp request vào hàng đợi
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await callRefreshToken();
                processQueue(null, newToken);

                // Gửi lại request cũ với token mới
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

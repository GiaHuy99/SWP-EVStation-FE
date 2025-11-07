import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// 🔹 Thêm-kiểu-dữ-liệu-cho-response-khi-refresh
interface RefreshTokenResponse {
    accessToken: string;
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
    // 🔹 BẮT BUỘC: Cho-phép-gửi-cookie-lên-server
    withCredentials: true,
});

// 1. Request Interceptor (Gửi-đi)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // "token" là accessToken

        // ⚠️ Không-gắn-token-cho-login / register / refresh
        const noAuthPaths = ["/auth/login", "/auth/register", "/auth/refresh"];

        if (token && config.url && !noAuthPaths.includes(config.url)) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ----------------------------------------------------------------
// 🔹 2. Response Interceptor (Nhận-về) - LOGIC MỚI
// ----------------------------------------------------------------

let isRefreshing = false; // Cờ-để-tránh-gọi-refresh-nhiều-lần-
// Hàng-chờ-cho-các-request-thất-bại-trong-khi-đang-refresh
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

// Hàm-xử-lý-hàng-chờ-
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token as string);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response, // Nếu-thành-công-thì-trả-về-
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // 🔹 Nếu-lỗi-là-401 (Unauthorized) và-chưa-phải-là-lượt-thử-lại-
        if (error.response?.status === 401 && !originalRequest._retry) {

            // Nếu-đang-refresh-rồi-thì-cho-vào-hàng-chờ-
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = "Bearer " + token;
                        return axiosInstance(originalRequest); // Thử-lại-với-token-mới-
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            // Đánh-dấu-đây-là-lượt-thử-lại-
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // 🔹 Tự-gọi-API-refresh-token
                // (Trình-duyệt-tự-gửi-HttpOnly-cookie)
                const response = await axiosInstance.post<RefreshTokenResponse>(
                    "/auth/refresh",
                    {}
                );

                const newAccessToken = response.data.accessToken;

                // 🔹 Lưu-accessToken-mới-vào-localStorage
                localStorage.setItem("token", newAccessToken);

                // Cập-nhật-token-cho-request-gốc-
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                // Xử-lý-hàng-chờ-với-token-mới-
                processQueue(null, newAccessToken);

                // Gửi-lại-request-gốc-
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                // 🔹 Nếu-refresh-thất-bại-(cookie-hết-hạn)
                processQueue(refreshError, null);
                // Xóa-sạch-dữ-liệu-storage-và-chuyển-hướng-
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("role");
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Trả-về-lỗi-cho-các-trường-hợp-khác- (không-phải-401)
        return Promise.reject(error);
    }
);


export default axiosInstance;
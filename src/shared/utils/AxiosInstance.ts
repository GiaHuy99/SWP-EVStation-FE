import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    // ⚠️ Không gắn token cho login / register
    if (
        token &&
        !config.url?.includes("/auth/login") &&
        !config.url?.includes("/auth/register")
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;

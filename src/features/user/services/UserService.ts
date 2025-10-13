import axios from "axios";
import { User, UpdateUserPayload } from "../types/UserType";

const API_URL = "http://localhost:8080/api/users"; // đổi theo backend của bạn

export const UserService = {
    async getById(id: string): Promise<User> {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    async updateProfile(payload: UpdateUserPayload): Promise<User> {
        const response = await axios.put(`${API_URL}/${payload.id}`, payload);
        return response.data;
    },
};

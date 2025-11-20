import axiosInstance from "../../../shared/utils/AxiosInstance";
import { User, CreateUserPayload, UpdateUserPayload } from "../types/UserType";

class UserService {
    // Get all users
    async getAllUsers(): Promise<User[]> {
        const response = await axiosInstance.get<User[]>("/admin/users");
        return response.data;
    }

    // Create new user
    async createUser(payload: CreateUserPayload): Promise<User> {
        const response = await axiosInstance.post<User>("/admin/users", payload);
        return response.data;
    }

    // Update user
    async updateUser(userId: number, payload: UpdateUserPayload): Promise<User> {
        const response = await axiosInstance.put<User>(`/admin/users/${userId}`, payload);
        return response.data;
    }

    // Delete user
    async deleteUser(userId: number): Promise<void> {
        await axiosInstance.delete(`/admin/users/${userId}`);
    }
}

export default new UserService();

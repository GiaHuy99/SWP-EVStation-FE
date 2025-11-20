// src/features/profile/services/profileService.ts
import axiosInstance from "../../../shared/utils/AxiosInstance";
import { UserProfile, UpdateProfileRequest } from "../types/ProfileType";

export const fetchUserProfileApi = async (): Promise<UserProfile> => {
    const res = await axiosInstance.get("/user/profile");
    return res.data;
};

export const updateUserProfileApi = async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const res = await axiosInstance.put("/user/profile", data);
    return res.data;
};
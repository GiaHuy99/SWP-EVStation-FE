// src/features/profile/services/profileService.ts
import axiosInstance from "../../../shared/utils/AxiosInstance";
import {UserProfile, UpdateProfileRequest, BatteryDetail} from "../types/ProfileType";
import { VehicleDetail} from "../types/ProfileType";

export const fetchUserProfileApi = async (): Promise<UserProfile> => {
    const res = await axiosInstance.get("/user/profile");
    return res.data;
};
interface VehicleApiResponse {
    vehicleId: number;
    vin: string;
    planName: string;
    batteries: BatteryDetail[];
}

export const updateUserProfileApi = async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const res = await axiosInstance.put("/user/profile", data);
    return res.data;
};
export async function getAllVehicles(): Promise<VehicleDetail[]> {
    const res = await axiosInstance.get<VehicleApiResponse[]>("/user/vehicles");

    return res.data.map((vehicle) => ({
        id: vehicle.vehicleId,
        vehicleName: vehicle.vin,
        currentPlan: vehicle.planName,
        batteries: vehicle.batteries || [], // nếu backend trả về null/undefined
    }));
}
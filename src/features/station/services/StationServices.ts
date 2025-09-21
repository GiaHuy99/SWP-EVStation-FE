import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "../../auth/types/AuthTypes";
import axiosInstance from "../../../shared/utils/AxiosInstance";
import {CreateStationPayload, Station} from "../types/StationType";

class StationServices {
    async createStation(payload: CreateStationPayload): Promise<Station> {
        const res = await axiosInstance.post<Station>("/stations", payload);
        return res.data;
    }
}
export default new StationServices();
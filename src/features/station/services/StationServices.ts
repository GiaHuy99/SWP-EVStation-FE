import axiosInstance from "../../../shared/utils/AxiosInstance";
import {CreateStationPayload, Station, UpdateStationPayload} from "../types/StationType";

class StationServices {
    async createStation(payload: CreateStationPayload): Promise<Station> {
        const res = await axiosInstance.post<Station>("/stations", payload);
        return res.data;
    }
    async getAll(): Promise<Station[]> {
        const res = await axiosInstance.get<Station[]>("/stations");
        return res.data;
    }
    async getStationById(id: number): Promise<Station> {
        const res = await axiosInstance.get<Station>(`/stations/${id}`);
        return res.data;
    }
}
export async function updateStation(payload: UpdateStationPayload): Promise<Station> {
    const res = await axiosInstance.put<Station>(`/stations/${payload.id}`, payload);
    return res.data;
}
export const deleteStation = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/stations/${id}`);
};
export default new StationServices();
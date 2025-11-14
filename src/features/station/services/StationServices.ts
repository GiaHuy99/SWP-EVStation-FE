import axios from "axios";
import { Station } from "../types/StationType";
import axiosInstance from "../../../shared/utils/AxiosInstance";

const API_BASE = "/stations";

const StationServices = {
  async getStations(): Promise<Station[]> {
    const res = await axiosInstance.get(API_BASE);
    return res.data;
  },

  async getStationById(id: number): Promise<Station> {
    const res = await axiosInstance.get(`${API_BASE}/${id}`);
    return res.data;
  },

  async createStation(payload: Omit<Station, "id">): Promise<Station> {
    const res = await axiosInstance.post(API_BASE, payload);
    return res.data;
  },

  async updateStation(id: number, payload: Partial<Station>): Promise<Station> {
    const res = await axios.put(`${API_BASE}/${id}`, payload);
    return res.data;
  },

  async deleteStation(id: number): Promise<void> {
    await axios.delete(`${API_BASE}/${id}`);
  },

  async getAllSummary(): Promise<
    {
      stationId: number;
      stationName: string;
      capacity: number;
      totalBatteries: number;
      usableBatteries: number;
      maintenanceBatteries: number;
      status: string;
    }[]
  > {
    const res = await axios.get(`${API_BASE}/summary`);
    return res.data;
  },

  async getStationSummary(id: number): Promise<{
    stationId: number;
    stationName: string;
    capacity: number;
    totalBatteries: number;
    usableBatteries: number;
    maintenanceBatteries: number;
    status: string;
  }> {
    const res = await axios.get(`${API_BASE}/${id}/summary`);
    return res.data;
  },
};

export default StationServices;

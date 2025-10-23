import { CreateStationPayload, Station } from "../types/StationMockType";

// Mock data
let mockStations: Station[] = [
    {
        id: 1,
        name: "Station HN01",
        location: "123 Trần Duy Hưng, Hà Nội",
        status: "ACTIVE",
        capacity: 50,
        phone: "0987654321",
        latitude: 21.0245,
        longitude: 105.8412
    },
    {
        id: 2,
        name: "Station HCM01",
        location: "456 Lê Văn Việt, TP.HCM",
        status: "INACTIVE",
        capacity: 75,
        phone: "0123456789",
        latitude: 10.7769,
        longitude: 106.7009
    },
    {
        id: 3,
        name: "Station DN01", 
        location: "789 Nguyễn Văn Linh, Đà Nẵng",
        status: "ACTIVE",
        capacity: 30,
        phone: "0369852147",
        latitude: 16.0544,
        longitude: 108.2022
    }
];

// Mock service class
export class StationMockService {
    static async create(payload: CreateStationPayload): Promise<Station> {
        const newStation: Station = {
            id: mockStations.length + 1,
            ...payload
        };
        mockStations.push(newStation);
        return Promise.resolve(newStation);
    }

    static async fetchAll(): Promise<Station[]> {
        return Promise.resolve([...mockStations]);
    }

    static async getById(id: number): Promise<Station> {
        const station = mockStations.find(s => s.id === id);
        if (!station) {
            return Promise.reject(new Error("Station not found"));
        }
        return Promise.resolve({...station});
    }

    static async update(id: number, payload: CreateStationPayload): Promise<Station> {
        const index = mockStations.findIndex(s => s.id === id);
        if (index === -1) {
            return Promise.reject(new Error("Station not found"));
        }
        
        const updatedStation: Station = {
            id,
            ...payload
        };
        mockStations[index] = updatedStation;
        return Promise.resolve({...updatedStation});
    }

    static async delete(id: number): Promise<void> {
        const index = mockStations.findIndex(s => s.id === id);
        if (index === -1) {
            return Promise.reject(new Error("Station not found"));
        }
        mockStations.splice(index, 1);
        return Promise.resolve();
    }
}
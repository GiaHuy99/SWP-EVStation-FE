import { Battery, CreateBatteryPayload } from "../types/BatteryType";

// Mock data
let batteries: Battery[] = [
    {
        id: 1,
        serialNumber: "BAT-VF8-001",
        status: "AVAILABLE",
        swapCount: 12,
        stationId: 1,
        stationName: "Station HN01"
    },
    {
        id: 2,
        serialNumber: "BAT-VF8-002",
        status: "IN_USE",
        swapCount: 8,
        stationId: 1,
        stationName: "Station HN01"
    },
    {
        id: 3,
        serialNumber: "BAT-VF8-003",
        status: "MAINTENANCE",
        swapCount: 15,
        stationId: 2,
        stationName: "Station HCM01"
    },
    {
        id: 4,
        serialNumber: "BAT-VF8-004",
        status: "AVAILABLE",
        swapCount: 5,
        stationId: 2,
        stationName: "Station HCM01"
    },
    // {
    //     id: 5,
    //     serialNumber: "BAT-VF8-005",
    //     status: "DAMAGED",
    //     swapCount: 20,
    //     stationId: 3,
    //     stationName: "Station DN01"
    // }
];

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const BatteryMockService = {
    // Create
    create: async (payload: CreateBatteryPayload): Promise<Battery> => {
        await delay(500); // Simulate network delay
        const newBattery: Battery = {
            ...payload,
            id: Math.max(...batteries.map(b => b.id)) + 1,
            stationName: payload.stationId ? `Station ${payload.stationId}` : null // Mock station name
        };
        batteries.push(newBattery);
        return { ...newBattery };
    },

    // Read all
    getAll: async (): Promise<Battery[]> => {
        await delay(500);
        return [...batteries];
    },

    // Read one
    getById: async (id: number): Promise<Battery> => {
        await delay(500);
        const battery = batteries.find(b => b.id === id);
        if (!battery) {
            throw new Error("Battery not found");
        }
        return { ...battery };
    },

    // Update
    update: async (id: number, payload: Partial<CreateBatteryPayload>): Promise<Battery> => {
        await delay(500);
        const index = batteries.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error("Battery not found");
        }
        const existingBattery = batteries[index];
        const updatedBattery: Battery = {
            ...existingBattery,
            ...payload,
            id,
            stationName: payload.stationId !== undefined
                ? `Station ${payload.stationId}`  // Update station name if stationId changed
                : existingBattery.stationName
        };
        batteries[index] = updatedBattery;
        return { ...updatedBattery };
    },

    // Delete
    delete: async (id: number): Promise<void> => {
        await delay(500);
        const index = batteries.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error("Battery not found");
        }
        batteries = batteries.filter(b => b.id !== id);
    }
};
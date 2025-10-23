import { CreateVehiclePayload, Vehicle } from "../types/VehicleMockType";

// Mock data
let vehicles: Vehicle[] = [
    {
        id: 1,
        vin: "VF8L12345678901",
        licensePlate: "51F-123.45",
        model: "VF 8",
        manufacturer: "VinFast",
        color: "Đen",
        year: 2023,
        status: "ACTIVE",
        wheelbase: 2950,
        seatHeight: 720,
        weightWithBattery: 2340,
        batteryPercentage: 85,
        mileage: 15000,
        userId: 1
    },
    {
        id: 2,
        vin: "VF34L9876543210",
        licensePlate: "51F-678.90",
        model: "VF e34",
        manufacturer: "VinFast",
        color: "Trắng",
        year: 2022,
        status: "ACTIVE",
        wheelbase: 2611,
        seatHeight: 680,
        weightWithBattery: 1750,
        batteryPercentage: 65,
        mileage: 25000,
        userId: 2
    },
    {
        id: 3,
        vin: "VF5L56789012345",
        licensePlate: "51F-246.80",
        model: "VF 5",
        manufacturer: "VinFast",
        color: "Xám",
        year: 2023,
        status: "INACTIVE",
        wheelbase: 2550,
        seatHeight: 650,
        weightWithBattery: 1420,
        batteryPercentage: 0,
        mileage: 5000,
        userId: 1
    },
    {
        id: 4,
        vin: "VF9L01234567890",
        licensePlate: "51F-357.91",
        model: "VF 9",
        manufacturer: "VinFast",
        color: "Xanh",
        year: 2024,
        status: "ACTIVE",
        wheelbase: 3150,
        seatHeight: 740,
        weightWithBattery: 2810,
        batteryPercentage: 92,
        mileage: 8000,
        userId: 3
    }
];

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const VehicleMockService = {
    // Create
    create: async (payload: CreateVehiclePayload): Promise<Vehicle> => {
        await delay(500); // Simulate network delay
        const newVehicle: Vehicle = {
            ...payload,
            id: Math.max(...vehicles.map(v => v.id)) + 1
        };
        vehicles.push(newVehicle);
        return newVehicle;
    },

    // Read all
    getAll: async (): Promise<Vehicle[]> => {
        await delay(500);
        return [...vehicles];
    },

    // Read one
    getById: async (id: number): Promise<Vehicle> => {
        await delay(500);
        const vehicle = vehicles.find(v => v.id === id);
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        return { ...vehicle };
    },

    // Update
    update: async (id: number, payload: Partial<CreateVehiclePayload>): Promise<Vehicle> => {
        await delay(500);
        const index = vehicles.findIndex(v => v.id === id);
        if (index === -1) {
            throw new Error("Vehicle not found");
        }
        const updatedVehicle: Vehicle = { ...vehicles[index], ...payload, id };
        vehicles[index] = updatedVehicle;
        return { ...updatedVehicle };
    },

    // Delete
    delete: async (id: number): Promise<void> => {
        await delay(500);
        const index = vehicles.findIndex(v => v.id === id);
        if (index === -1) {
            throw new Error("Vehicle not found");
        }
        vehicles = vehicles.filter(v => v.id !== id);
    }
};
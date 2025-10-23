export interface Vehicle {
    id: number;
    vin: string;
    licensePlate: string;
    model: string;
    manufacturer: string;
    color: string;
    year: number;
    status: "ACTIVE" | "INACTIVE";
    wheelbase: number;
    seatHeight: number;
    weightWithBattery: number;
    batteryPercentage: number;
    mileage: number;
    userId: number;
}

export interface CreateVehiclePayload {
    vin: string;
    licensePlate: string;
    model: string;
    manufacturer: string;
    color: string;
    year: number;
    status: "ACTIVE" | "INACTIVE";
    wheelbase: number;
    seatHeight: number;
    weightWithBattery: number;
    batteryPercentage: number;
    mileage: number;
    userId: number;
}

export interface VehicleState {
    vehicles: Vehicle[];
    selectedVehicle: Vehicle | null;
    loading: boolean;
    error: string | null;
}
export interface Vehicle {
    id?: number;
    vin: string;
    model: string;
    dimensions: string;
    wheelbase: string;
    groundClearance: string;
    seatHeight: string;
    frontTire: string;
    rearTire: string;
    frontSuspension: string;
    rearSuspension: string;
    brakeSystem: string;
    trunkCapacity: string;
    weightWithoutBattery: number;
    weightWithBattery: number;
}

export interface CreateVehiclePayload {
    vin: string;
    model: string;
    dimensions: string;
    wheelbase: string;
    groundClearance: string;
    seatHeight: string;
    frontTire: string;
    rearTire: string;
    frontSuspension: string;
    rearSuspension: string;
    brakeSystem: string;
    trunkCapacity: string;
    weightWithoutBattery: number;
    weightWithBattery: number;
}

export interface VehicleState {
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
}

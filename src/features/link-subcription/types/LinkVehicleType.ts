export interface LinkVehiclePayload {
    vehicleId: number;
    subscriptionPlanId: number;
}

export interface LinkedVehicleResponse {
    message: string;
    vehicle: {
        id: number;
        vin: string;
        model: string;
    };
    subscription: {
        id: number;
        planName: string;
        status: string;
        startDate: string;
        endDate: string;
    };
    batteries: {
        id: number;
        serialNumber: string;
        status: string;
    }[];
}

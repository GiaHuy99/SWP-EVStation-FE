// features/reservation/types/index.ts
export interface Station {
    id: number;
    name: string;
    location: string;
    status: "ACTIVE" | "INACTIVE";
    capacity: number;
    phone: string;
    latitude: number;
    longitude: number;
}

export interface BatterySerial {
    id: number;
    serialNumber: string;
    status: "AVAILABLE" | "IN_USE" | "DAMAGED" | "MAINTENANCE";
    stationId: number | null;
    stationName: string | null;
    batteryId: number;
    batteryName?: string;
}

export interface UserVehicle {
    vehicleId: number;
    vehicle: string;
    currentPlan: string;
}

export interface ReservationState {
    stations: Station[];
    allBatterySerials: BatterySerial[];
    availableBatteries: BatterySerial[]; // lọc AVAILABLE + có station
    vehicles: UserVehicle[];

    selectedStationId: number | null;
    selectedVehicle: UserVehicle | null;
    quantity: number;
    selectedBatteryIds: number[];

    reservation: any | null;
    countdown: number;

    loading: boolean;
    loadingStations: boolean;
    loadingBatteries: boolean;
    loadingVehicles: boolean;
    error: string | null;
}
// features/reservation/types/reservationTypes.ts
export interface Reservation {
    reservationId: number;
    status: "ACTIVE" | "EXPIRED" | "CANCELLED" | "USED";
    vehicle: {
        id: number;
        vin: string;
        modelName: string;
    };
    station: {
        id: number;
        name: string;
        address: string;
    };
    quantity: number;
    batteries: {
        id: number;
        serialNumber: string;
        chargePercent: number;
        stateOfHealth: number;
    }[];
    reservedAt: string;
    expireAt: string;
    remainingMinutes: number;
    message: string;
    swapTransactionId: number | null;
    usedAt: string | null;
    cancelReason: string | null;
}
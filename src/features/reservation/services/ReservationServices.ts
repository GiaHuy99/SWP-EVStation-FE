// features/reservation/services/reservationService.ts
import axiosInstance from '../../../shared/utils/AxiosInstance';
import {Station, BatterySerial, UserVehicle, Reservation} from '../types/reservationTypes';

export const fetchStations = async (): Promise<Station[]> => {
    const res = await axiosInstance.get<Station[]>('/stations'); // hoặc API_BASE của bạn
    return res.data;
};

export const fetchAllBatterySerials = async (): Promise<BatterySerial[]> => {
    const [serialsRes, batteriesRes] = await Promise.all([
        axiosInstance.get<any[]>('/battery-serials'),
        axiosInstance.get<any[]>('/batteries'),
    ]);

    const batteryMap = new Map<number, string>();
    batteriesRes.data.forEach(b => {
        batteryMap.set(b.id, b.name || `Pin ${b.id}`);
    });

    return serialsRes.data.map(s => ({
        ...s,
        batteryName: batteryMap.get(s.batteryId) || 'Không xác định',
    }));
};

export const fetchUserVehicles = async (): Promise<UserVehicle[]> => {
    const res = await axiosInstance.get<any[]>('/user/subscriptions');
    return res.data.map(item => ({
        vehicleId: item.vehicleId,
        vehicle: item.vehicle,
        currentPlan: item.currentPlan,
    }));
};

export const createReservation = async (payload: {
    vehicleId: number;
    stationId: number;
    quantity: number;
    batteryIds: number[];
}) => {
    const res = await axiosInstance.post('/user/reservations', payload);
    return res.data;
};
// features/reservation/services/reservationService.ts
export const fetchUserReservations = async (): Promise<Reservation[]> => {
    const res = await axiosInstance.get<Reservation[]>('/user/reservations');
    return res.data;
};

export const cancelReservation = async (reservationId: number): Promise<any> => {
    const res = await axiosInstance.delete(`/user/reservations/${reservationId}`);
    return res.data;
};
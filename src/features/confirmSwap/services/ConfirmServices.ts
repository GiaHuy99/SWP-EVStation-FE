// src/features/staff-swap/services/staffSwapService.ts

import axiosInstance from "../../../shared/utils/AxiosInstance";
import { BatterySwapRecord } from "../types/ConfirmTypes";

export const fetchPendingSwapsApi = async (): Promise<BatterySwapRecord[]> => {
    const res = await axiosInstance.get<BatterySwapRecord[]>("/staff/swap/pending");
    return res.data;
};

// export const confirmSwapApi = async (id: number): Promise<{ message: string }> => {
//     const res = await axiosInstance.put<{ message: string }>(`/staff/swap/${id}/confirm`);
//     return res.data;
// };
export const confirmSwapApi = async (
    requestId: number,
    payload: {
        newBatterySerialId: number;
        endPercent: number;
    }
): Promise<{ message: string }> => {
    const res = await axiosInstance.put<{ message: string }>(
        `/staff/swap/${requestId}/confirm`,
        payload // ← BẮT BUỘC GỬI BODY
    );
    return res.data;
};


export const rejectSwapApi = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.put<{ message: string }>(`/staff/swap/${id}/reject`);
    return res.data;
};
export const fetchReservationSwapsApi = async (): Promise<any[]> => {
    const res = await axiosInstance.get("/staff/swap/reservations?status=ACTIVE");
    return res.data; // backend trả mảng trực tiếp
};

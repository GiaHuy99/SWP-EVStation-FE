// src/features/staff-swap/services/staffSwapService.ts

import axiosInstance from "../../../shared/utils/AxiosInstance";
import { BatterySwapRecord } from "../types/ConfirmTypes";

export const fetchPendingSwapsApi = async (): Promise<BatterySwapRecord[]> => {
    const res = await axiosInstance.get<BatterySwapRecord[]>("/staff/swap/pending");
    return res.data;
};

export const confirmSwapApi = async (
    transactionId: number,
    payload: {
        newBatterySerialId: number;
        endPercent: number;
    }
): Promise<{ message: string }> => {
    const res = await axiosInstance.put<{ message: string }>(
        `/staff/swap/${transactionId}/confirm`,
        payload // ← BẮT BUỘC GỬI BODY
    );
    return res.data;
};


export const rejectSwapApi = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.put<{ message: string }>(`/staff/swap/${id}/reject`);
    return res.data;
};


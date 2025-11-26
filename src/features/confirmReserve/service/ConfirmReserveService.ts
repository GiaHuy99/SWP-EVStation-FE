import axiosInstance from "../../../shared/utils/AxiosInstance";
import {ReservationSwapList} from "@/src/features/confirmReserve/type/ReservationSwapType";

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

export const getPendingReservationApi = async (): Promise<ReservationSwapList> => {
    const res = await axiosInstance.get<ReservationSwapList>(
        "/staff/swap/pending-reservation"
    );
    return res.data;
};
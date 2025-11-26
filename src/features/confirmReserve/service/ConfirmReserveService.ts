import axiosInstance from "@/src/shared/utils/AxiosInstance";

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
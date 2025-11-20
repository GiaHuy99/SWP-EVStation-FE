// src/features/invoice/services/invoiceService.ts
import axiosInstance from "../../../shared/utils/AxiosInstance";
import { Invoice } from "../types/InvoiceType";

export const fetchUserInvoicesApi = async (): Promise<Invoice[]> => {
    const response = await axiosInstance.get("/user/invoices");
    return response.data;
};
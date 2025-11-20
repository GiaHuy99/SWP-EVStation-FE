// src/features/invoice/InvoiceThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserInvoicesApi } from "./services/invoiceService";
import { Invoice } from "./types/InvoiceType";

export const fetchUserInvoices = createAsyncThunk<Invoice[]>(
    "invoice/fetchUserInvoices",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchUserInvoicesApi();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Lỗi tải hóa đơn");
        }
    }
);
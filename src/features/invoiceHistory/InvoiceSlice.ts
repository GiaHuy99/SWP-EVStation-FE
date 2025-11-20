// src/features/invoice/InvoiceSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInvoices } from "./InvoiceThunks";
import { Invoice } from "./types/InvoiceType";

interface InvoiceState {
    invoices: Invoice[];
    loading: boolean;
    error: string | null;
}

const initialState: InvoiceState = {
    invoices: [],
    loading: false,
    error: null,
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload;
            })
            .addCase(fetchUserInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default invoiceSlice.reducer;
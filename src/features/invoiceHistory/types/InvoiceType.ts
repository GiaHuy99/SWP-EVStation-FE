// src/features/invoice/types/InvoiceType.ts
export interface Invoice {
    invoiceId: number;
    subscriptionId: number;
    swapTransactionId: number | null;
    vehicleVin: string;
    vehicleModel: string;
    planName: string;
    planType: "DISTANCE" | "ENERGY";
    amount: number;
    status: "PENDING" | "PAID";
    description: string;
    overage: number | null;
    rate: number | null;
    unit: "km" | null;
    createdAt: string;
    paidAt: string | null;
}

export type InvoiceFilter = "ALL" | "PENDING" | "PAID";
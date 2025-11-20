// src/features/subscription/types/SubscriptionType.ts

export interface Vehicle {
    vehicleId: number;
    vehicle: string;
    currentPlan: string;
    startDate: string;
    endDate: string;
    nextPlan?: string;
}

export interface Plan {
    id: number;
    name: string;
    price?: number;
}

// TYPE ĐÃ ĐƯỢC SỬA CHUẨN 100% THEO RESPONSE THỰC TẾ
export interface ChangePlanResponse {
    subscriptionId: number;
    status: "PENDING" | "ACTIVE" | "COMPLETED";
    planName: string;
    startDate: string;
    endDate: string;
    amount: number;
    invoiceId: number;
    invoiceAmount: number;
    message: string;
    note?: string;
}
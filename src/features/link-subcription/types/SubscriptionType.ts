// src/features/subscription/types/SubscriptionType.ts
export interface Vehicle {
    vehicleId: number;
    vehicle: string;
    currentPlan: string;
    startDate: string;
    endDate: string;
    nextPlan: string;

}

export interface Plan {
    id: number;
    name: string;
    price?: number;
}

export interface ChangePlanResponse {
    message: string;
    invoiceId?: number;
    invoiceAmount?: number;
    subscription: {
        id: number;
        currentPlan: string;
        nextPlanId: number;
        nextPlanName: string;
        endDate: string;
        status: "PENDING" | "ACTIVE";
    };
}

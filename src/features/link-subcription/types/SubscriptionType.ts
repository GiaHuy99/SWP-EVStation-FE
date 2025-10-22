// src/features/subscription/types/SubscriptionType.ts
export interface Vehicle {
    id: number;
    model: string;
    vin: string;
}

export interface Plan {
    id: number;
    name: string;
    price?: number;
}

export interface ChangePlanResponse {
    subscription: {
        id: number;
        currentPlan: string;
        nextPlanId: number;
        endDate: string;
        status: string;
    };
    message: string;
}

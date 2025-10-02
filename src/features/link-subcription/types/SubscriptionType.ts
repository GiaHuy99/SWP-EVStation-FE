// src/features/subscription/types/SubscriptionType.ts
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

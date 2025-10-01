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
 export interface SubscriptionPlanState {
     plans: { id: number; name: string }[];
     loading: boolean;
     error: string | null;
     changeMessage: string | null;
}



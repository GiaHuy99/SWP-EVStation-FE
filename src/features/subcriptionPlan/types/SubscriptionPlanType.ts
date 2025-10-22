export interface SubscriptionPlan {
    id: number;
    name: string;
    price: number;
    durationDays: number;
    maxBatteries: number;
    baseMileage: number;
    baseEnergy: number;
    planType: "DISTANCE" | "ENERGY" | "UNLIMITED";
    status: "ACTIVE" | "INACTIVE";
}

export interface CreateSubscriptionPlanPayload {
    name: string;
    price: number;
    durationDays: number;
    maxBatteries: number;
    baseMileage: number;
    baseEnergy: number;
    planType: "DISTANCE" | "ENERGY" | "UNLIMITED";
    status: "ACTIVE" | "INACTIVE";
}
export interface SubscriptionPlanState {
    plans: SubscriptionPlan[];
    selectedPlan: SubscriptionPlan | null;
    loading: boolean;
    error: string | null;
}
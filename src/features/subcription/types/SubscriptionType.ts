export interface UserSubscription {
    vehicle: string;
    currentPlan: string;
    startDate: string;
    endDate: string;
    nextPlan: string;
}

export interface AutoRenewResponse {
    message: string;
}

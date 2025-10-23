import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "../types/SubscriptionPlanType";

// Mock data
let mockPlans: SubscriptionPlan[] = [
    {
        id: 1,
        name: "Basic Plan",
        price: 299000,
        durationDays: 30,
        maxBatteries: 1,
        baseMileage: 1000,
        baseEnergy: 100,
        planType: "DISTANCE",
        status: "ACTIVE"
    },
    {
        id: 2,
        name: "Premium Plan", 
        price: 499000,
        durationDays: 30,
        maxBatteries: 2,
        baseMileage: 2000,
        baseEnergy: 200,
        planType: "ENERGY",
        status: "ACTIVE"
    },
    {
        id: 3,
        name: "Ultimate Plan",
        price: 999000, 
        durationDays: 30,
        maxBatteries: 3,
        baseMileage: 0,
        baseEnergy: 0,
        planType: "UNLIMITED",
        status: "ACTIVE"
    }
];

// Mock service class
export class SubscriptionPlanMockService {
    static async create(payload: CreateSubscriptionPlanPayload): Promise<SubscriptionPlan> {
        const newPlan: SubscriptionPlan = {
            id: mockPlans.length + 1,
            ...payload
        };
        mockPlans.push(newPlan);
        return Promise.resolve(newPlan);
    }

    static async fetchAll(): Promise<SubscriptionPlan[]> {
        return Promise.resolve([...mockPlans]);
    }

    static async getById(id: number): Promise<SubscriptionPlan> {
        const plan = mockPlans.find(p => p.id === id);
        if (!plan) {
            return Promise.reject(new Error("Subscription plan not found"));
        }
        return Promise.resolve({...plan});
    }

    static async update(id: number, payload: CreateSubscriptionPlanPayload): Promise<SubscriptionPlan> {
        const index = mockPlans.findIndex(p => p.id === id);
        if (index === -1) {
            return Promise.reject(new Error("Subscription plan not found"));
        }
        
        const updatedPlan: SubscriptionPlan = {
            id,
            ...payload
        };
        mockPlans[index] = updatedPlan;
        return Promise.resolve({...updatedPlan});
    }

    static async delete(id: number): Promise<void> {
        const index = mockPlans.findIndex(p => p.id === id);
        if (index === -1) {
            return Promise.reject(new Error("Subscription plan not found"));
        }
        mockPlans.splice(index, 1);
        return Promise.resolve();
    }
}
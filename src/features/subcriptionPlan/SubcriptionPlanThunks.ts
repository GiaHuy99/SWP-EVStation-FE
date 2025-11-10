// src/features/subscription/SubcriptionPlanThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "./types/SubscriptionPlanType";

// 🟢 1️⃣ Lấy tất cả gói
export const fetchSubscriptionPlans = createAsyncThunk<
    SubscriptionPlan[],
    void,
    { rejectValue: string }
>("subscriptionPlan/fetch", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/subscription-plans");
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.message || "Không thể tải danh sách gói");
    }
});

// 🟢 2️⃣ Tạo gói mới
export const createSubscriptionPlan = createAsyncThunk<
    SubscriptionPlan,
    CreateSubscriptionPlanPayload,
    { rejectValue: string }
>("subscriptionPlan/create", async (payload, { rejectWithValue }) => {
    try {
        const res = await axios.post("http://localhost:8080/api/admin/subscription-plans", payload);
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.message || "Không thể tạo gói mới");
    }
});


export const getSubscriptionPlanById = createAsyncThunk<
    SubscriptionPlan,
    number,
    { rejectValue: string }
>("subscriptionPlan/getById", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/subscription-plans/${id}`);
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.message || "Không thể lấy chi tiết gói");
    }
});


export const updatePlan = createAsyncThunk<
    SubscriptionPlan,
    { id: number; payload: CreateSubscriptionPlanPayload },
    { rejectValue: string }
>("subscriptionPlan/updatePlan", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const res = await axios.put(
            `http://localhost:8080/api/admin/subscription-plans/${id}`,
            payload
        );
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.message || "Cập nhật thất bại");
    }
});


export const deletePlan = createAsyncThunk<number, number, { rejectValue: string }>(
    "subscriptionPlan/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/subscription-plans/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.message || "Xoá thất bại");
        }
    }
);

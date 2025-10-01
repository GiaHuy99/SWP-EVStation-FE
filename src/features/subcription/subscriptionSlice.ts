import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserSubscription, AutoRenewResponse } from "./types/SubscriptionType";
import { getUserSubscriptions, autoRenewAll } from "./services/subscriptionService";

interface SubscriptionState {
    list: UserSubscription[];
    loading: boolean;
    error: string | null;
    autoRenewMessage: string | null;
}

const initialState: SubscriptionState = {
    list: [],
    loading: false,
    error: null,
    autoRenewMessage: null,
};

// Lấy subscriptions của user
export const fetchSubscriptions = createAsyncThunk<UserSubscription[]>(
    "subscription/fetchSubscriptions",
    async () => {
        return await getUserSubscriptions();
    }
);

// Auto renew tất cả
export const runAutoRenew = createAsyncThunk<AutoRenewResponse, void, { rejectValue: string }>(
    "subscription/runAutoRenew",
    async (_, { rejectWithValue }) => {
        try {
            return await autoRenewAll();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Auto renew failed");
        }
    }
);

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        clearMessage(state) {
            state.autoRenewMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching subscriptions";
            })
            .addCase(runAutoRenew.pending, (state) => {
                state.loading = true;
            })
            .addCase(runAutoRenew.fulfilled, (state, action) => {
               state.loading = false;
                state.autoRenewMessage = action.payload.message;
            })
            .addCase(runAutoRenew.rejected, (state, action) => {
                state.loading = false;
                state.autoRenewMessage = action.payload || "Auto renew failed";
            });
    },
});

export const { clearMessage } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

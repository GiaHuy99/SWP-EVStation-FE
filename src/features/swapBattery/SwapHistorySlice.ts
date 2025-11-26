// src/features/swapBattery/SwapHistorySlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSwapHistory } from "./SwapThunks"; // ĐÚNG – bạn đã để thunk ở đây
import { SwapHistoryItem, SwapHistoryResponse } from "./types/SwapBatteryType";

interface SwapHistoryState {
    history: SwapHistoryItem[];
    loading: boolean;
    error: string | null;
    total: number;
    currentPage: number;
    pageSize: number;
}

const initialState: SwapHistoryState = {
    history: [],
    loading: false,
    error: null,
    total: 0,
    currentPage: 1,
    pageSize: 20,
};

const swapHistorySlice = createSlice({
    name: "swapHistory",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSwapHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSwapHistory.fulfilled, (state, action: PayloadAction<SwapHistoryResponse>) => {
                state.loading = false;
                state.history = action.payload.history;
                state.total = action.payload.total;
                state.pageSize = action.payload.pageSize || 20;
                // page không cần lưu vì đã có currentPage
            })
            .addCase(fetchSwapHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setPage } = swapHistorySlice.actions;
export default swapHistorySlice.reducer;
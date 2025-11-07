import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Station } from './types/stationTypes';
import StationThunks from './stationThunks'; // Import class Thunk

// 1. Định nghĩa kiểu cho State
export interface StationState {
    stations: Station[];
    currentStation: Station | null; // Ví dụ: nếu có trang chi tiết
    isLoading: boolean;
    error: string | null;
}

// 2. Định nghĩa State ban đầu
const initialState: StationState = {
    stations: [],
    currentStation: null,
    isLoading: false,
    error: null,
};

/**
 * Class để tạo và quản lý Slice của Station
 */
class StationSlice {
    // Dùng 'public static' để slice là một thuộc tính tĩnh của class
    public static slice = createSlice({
        name: 'stations', // Tên của slice
        initialState,

        // 3. Reducers (Xử lý các action đồng bộ)
        reducers: {
            // Xóa lỗi
            clearError: (state) => {
                state.error = null;
            },
            // Chọn 1 station
            selectStation: (state, action: PayloadAction<Station | null>) => {
                state.currentStation = action.payload;
            },
        },

        // 4. ExtraReducers (Xử lý các action bất đồng bộ từ Thunk)
        extraReducers: (builder) => {
            builder
                // Trường hợp 1: Đang chờ fetchStations
                .addCase(StationThunks.fetchStations.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                // Trường hợp 2: fetchStations thành công
                .addCase(StationThunks.fetchStations.fulfilled, (state, action: PayloadAction<Station[]>) => {
                    state.isLoading = false;
                    state.stations = action.payload;
                })
                // Trường hợp 3: fetchStations thất bại
                .addCase(StationThunks.fetchStations.rejected, (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload; // payload này là message từ rejectWithValue
                });
        },
    });

    // Helper để export actions
    public static get actions() {
        return this.slice.actions;
    }

    // Helper để export reducer
    public static get reducer() {
        return this.slice.reducer;
    }
}

// Export các actions đồng bộ
export const { clearError, selectStation } = StationSlice.actions;

// Export reducer
export default StationSlice.reducer;
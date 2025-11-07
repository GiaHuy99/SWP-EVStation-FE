import { createAsyncThunk } from '@reduxjs/toolkit';
import stationService from './services/stationService'; // Import service instance
import { Station } from './types/stationTypes';

// Định nghĩa tên feature (để tạo prefix cho action type)
const FEATURE_NAME = 'stations';

/**
 * Class chứa các Async Thunks liên quan đến Station.
 */
class StationThunks {
    /**
     * Thunk action để lấy danh sách stations
     */
    public static fetchStations = createAsyncThunk(
        `${FEATURE_NAME}/fetchStations`, // Action type: "stations/fetchStations"
        async (_, thunkAPI) => {
            try {
                // Gọi service
                const data = await stationService.getStations();
                return data;
            } catch (error: any) {
                // Xử lý lỗi (ví dụ: lỗi từ axios interceptor)
                const message = (error.response?.data?.message) || error.message || 'Đã xảy ra lỗi';
                return thunkAPI.rejectWithValue(message);
            }
        }
    );

}

export default StationThunks;
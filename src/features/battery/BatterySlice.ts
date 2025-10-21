import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BatteryTypes } from "./types/BatteryTypes";
import {
    createBatteryType,
    deleteBatteryType,
    fetchBatteryTypes,
    getBatteryTypeById,
    updateBatteryType
} from "./BatteryThunk";

/**
 * Interface định nghĩa cấu trúc state cho feature "BatteryType".
 */
interface BatteryTypeState {
    batteryTypes: BatteryTypes[];              // Danh sách tất cả các loại pin
    selectedBatteryType: BatteryTypes | null;  // Loại pin đang được chọn (để xem chi tiết hoặc chỉnh sửa)
    loading: boolean;                         // Trạng thái loading khi gọi API
    error: string | null;                     // Lỗi nếu có
}

/**
 * Giá trị khởi tạo cho state.
 */
const initialState: BatteryTypeState = {
    batteryTypes: [],
    selectedBatteryType: null,
    loading: false,
    error: null,
};

/**
 * Tạo một slice của Redux store để quản lý "Loại Pin".
 * Slice này bao gồm reducers để xử lý các actions đồng bộ và bất đồng bộ.
 */
const batteryTypeSlice = createSlice({
    name: "batteryType",
    initialState,
    // Reducers cho các actions đồng bộ (synchronous actions)
    reducers: {
        /**
         * Xóa thông tin loại pin đang được chọn khỏi state.
         * Hữu ích khi người dùng rời khỏi trang chi tiết.
         */
        clearSelectedBatteryType: (state) => {
            state.selectedBatteryType = null;
        },
    },
    // Reducers cho các actions bất đồng bộ (async thunks)
    extraReducers: (builder) => {
        builder
            // Xử lý khi lấy danh sách tất cả các loại pin thành công
            .addCase(fetchBatteryTypes.fulfilled, (state, action: PayloadAction<BatteryTypes[]>) => {
                state.batteryTypes = action.payload;
            })
            // Xử lý khi lấy thông tin chi tiết một loại pin thành công
            .addCase(getBatteryTypeById.fulfilled, (state, action: PayloadAction<BatteryTypes>) => {
                state.selectedBatteryType = action.payload;
            })
            // Xử lý khi tạo mới một loại pin thành công
            .addCase(createBatteryType.fulfilled, (state, action: PayloadAction<BatteryTypes>) => {
                state.batteryTypes.push(action.payload);
            })
            // Xử lý khi cập nhật một loại pin thành công
            .addCase(updateBatteryType.fulfilled, (state, action: PayloadAction<BatteryTypes>) => {
                // Tìm và thay thế loại pin đã được cập nhật trong danh sách
                state.batteryTypes = state.batteryTypes.map((bt) =>
                    bt.id === action.payload.id ? action.payload : bt
                );
                // Nếu loại pin được cập nhật là loại đang được chọn, cập nhật luôn selectedBatteryType
                if (state.selectedBatteryType && state.selectedBatteryType.id === action.payload.id) {
                    state.selectedBatteryType = action.payload;
                }
            })
            // Xử lý khi xóa một loại pin thành công
            .addCase(deleteBatteryType.fulfilled, (state, action: PayloadAction<number>) => {
                // Lọc ra khỏi danh sách loại pin có id vừa bị xóa (id nằm trong action.payload)
                state.batteryTypes = state.batteryTypes.filter(
                    (bt) => bt.id !== action.payload
                );
            });
    },
});

// Export các actions đồng bộ để có thể dispatch từ component
export const { clearSelectedBatteryType } = batteryTypeSlice.actions;

// Export reducer để thêm vào store
export default batteryTypeSlice.reducer;
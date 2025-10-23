import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Battery, BatteryListItem, BatteryState } from "./types/Battery";
import {
    createBattery,
    deleteBattery,
    fetchBatteries,
    getBatteryById,
} from "./BatteryThunk";

/**
 * Interface định nghĩa cấu trúc state cho feature "Battery".
 */
// Ghi chú: Interface này đã được định nghĩa trong `batteryTypes.ts`,
// nhưng chúng ta có thể copy lại đây để file slice được độc lập nếu muốn.
// export interface BatteryState {
//     batteries: BatteryListItem[];
//     selectedBattery: Battery | null;
//     loading: boolean;
//     error: string | null;
// }

/**
 * Giá trị khởi tạo cho state.
 */
const initialState: BatteryState = {
    batteries: [],
    selectedBattery: null,
    loading: false,
    error: null,
};

/**
 * Tạo một slice của Redux store để quản lý các "Viên Pin".
 * Slice này bao gồm reducers để xử lý các actions đồng bộ và bất đồng bộ.
 */
const batterySlice = createSlice({
    name: "battery",
    initialState,
    // Reducers cho các actions đồng bộ (synchronous actions)
    reducers: {
        /**
         * Xóa thông tin viên pin đang được chọn khỏi state.
         * Hữu ích khi người dùng đóng popup chi tiết.
         */
        clearSelectedBattery: (state) => {
            state.selectedBattery = null;
        },
    },
    // Reducers cho các actions bất đồng bộ (async thunks)
    extraReducers: (builder) => {
        builder
            // === Xử lý `createBattery` ===
            .addCase(createBattery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBattery.fulfilled, (state, action: PayloadAction<Battery>) => {
                state.loading = false;
                const newItem: BatteryListItem = {
                    id: action.payload.id,
                    serialNumber: action.payload.serialNumber,
                    status: action.payload.status,
                    stationId: action.payload.stationId,
                    stationName: action.payload.stationName,
                    batteryTypeId: action.payload.batteryTypeId, // Giả định có trường này
                };
                state.batteries.push(newItem);
            })
            .addCase(createBattery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // === Xử lý `fetchBatteries` ===
            .addCase(fetchBatteries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBatteries.fulfilled, (state, action: PayloadAction<BatteryListItem[]>) => {
                state.loading = false;
                state.batteries = action.payload;
            })
            .addCase(fetchBatteries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // === Xử lý `getBatteryById` ===
            .addCase(getBatteryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBatteryById.fulfilled, (state, action: PayloadAction<Battery>) => {
                state.loading = false;
                state.selectedBattery = action.payload;
            })
            .addCase(getBatteryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            // === Xử lý `deleteBattery` ===
            .addCase(deleteBattery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBattery.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.batteries = state.batteries.filter(
                    (battery) => battery.id !== action.payload
                );
            })
            .addCase(deleteBattery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Export các actions đồng bộ để có thể dispatch từ component
export const { clearSelectedBattery } = batterySlice.actions;

// Export reducer để thêm vào store
export default batterySlice.reducer;
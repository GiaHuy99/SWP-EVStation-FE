import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import stationReducer from "../features/station/StationSlice";
import batteryReducer from "../features/battery/BatterySlice";
import subscriptionPlanReducer from "../features/subcriptionPlan/SubcriptionPlantSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        station: stationReducer,
        battery: batteryReducer,
        subscriptionPlan: subscriptionPlanReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

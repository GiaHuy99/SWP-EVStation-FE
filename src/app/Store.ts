import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import stationReducer from "../features/station/StationSlice";
import batteryReducer from "../features/battery/BatterySlice";
import subscriptionPlanReducer from "../features/subcriptionPlan/SubcriptionPlantSlice";
import vehicleReducer from "../features/vehicle/VehicleSlices";
import notificationReducer from "../shared/utils/notificationSlice";
import { notificationMiddleware } from "../shared/utils/notificationMiddleware";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        station: stationReducer,
        battery: batteryReducer,
        subscriptionPlan: subscriptionPlanReducer,
        vehicle:vehicleReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(notificationMiddleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

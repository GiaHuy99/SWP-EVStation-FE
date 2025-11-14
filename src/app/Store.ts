import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import stationReducer from "../features/station/StationSlice";
import batteryReducer from "../features/battery/BatterySlice";
import subscriptionPlanReducer from "../features/subcriptionPlan/SubcriptionPlantSlice";
import vehicleReducer from "../features/vehicle/VehicleSlices";
import notificationReducer from "../shared/utils/notification/notificationSlice";
import { notificationMiddleware } from "../shared/utils/notification/notificationMiddleware";
import link_SubcriptionReducer from "../features/link-subcription/Link_SubcriptionSlices";
import subcriptionReducer from "../features/link-subcription/ChangeSubscriptionSlice";
import subcription from "../features/subcription/subscriptionSlice"
import swapBattery from "../features/swapBattery/SwapSlice";
import stationMap from "../features/map/stationSlice"
import batterySerials from "../features/BatterySerials/BatterySerialSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        station: stationReducer,
        battery: batteryReducer,
        subscriptionPlan: subscriptionPlanReducer,
        vehicle:vehicleReducer,
        notification: notificationReducer,
        link_Subcription:link_SubcriptionReducer,
        subcription:subcriptionReducer,
        subcsription1:subcription,
        swapBattery:swapBattery,
        stationMap:stationMap,
        batterySerials:batterySerials,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(notificationMiddleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

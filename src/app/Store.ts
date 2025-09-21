import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import stationReducer from "../features/station/StationSlice"; // ✅ import

export const store = configureStore({
    reducer: {
        auth: authReducer,
        station: stationReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

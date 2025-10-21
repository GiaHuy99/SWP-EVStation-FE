import React from 'react';
import "./index.css";
import LoginPage from "./features/auth/pages/LoginPage";

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RegisterPage from "./features/auth/pages/RegisterPage";
import CreateStationPage from "./features/station/pages/CreateStationPage";
import ListStationPage from "./features/station/pages/ListStationPage";
import BatteryTypeCreatePage from "./features/batteryType/pages/BatteryTypeCreatePage";
import BatteryTypeListPage from "./features/batteryType/pages/BatteryTypeListPage";
import CreateSubscriptionPlanPage from "./features/subcriptionPlan/pages/CreateSubscriptionPlanPage";
import SubscriptionPlanPage from "./features/subcriptionPlan/pages/SubscriptionPlanPage";
import VehiclePage from "./features/vehicle/pages/VehiclePage";
import VehicleListPage from "./features/vehicle/pages/VehicleListPage";
import NotificationProvider from "./shared/utils/notification/NotificationProvider";
import LinkVehiclePage from "./features/link-subcription/pages/LinkVehiclePage";
import ChangePlanPage from "./features/link-subcription/pages/ChangePlanPage";
import UserSubscriptionsPage from './features/subcription/pages/UserSubscriptionsPage';
import Layout from "./shared/utils/navbar/Layout";
import BatteryListPage from "./features/Battery/pages/List";
import CreateBatteryPage from "./features/Battery/pages/create";

function App() {
  return (
      <BrowserRouter>
          <NotificationProvider />
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Sử dụng Layout cho các trang sau login */}
              <Route element={<Layout />}>
                  <Route path="/stations/create" element={<CreateStationPage />} />
                  <Route path="/stations/list" element={<ListStationPage />} />
                  <Route path="/batteryType/create" element={<BatteryTypeCreatePage />} />
                  <Route path="/batteryType/list" element={<BatteryTypeListPage />} />
                  <Route path="/battery/create" element={<CreateBatteryPage />} />
                  <Route path="/battery/list" element={<BatteryListPage />} />
                  <Route path="/subcriptionPlan/create" element={<CreateSubscriptionPlanPage />} />
                  <Route path="/subcriptionPlan/list" element={<SubscriptionPlanPage />} />
                  <Route path="/vehicle/create" element={<VehiclePage />} />
                  <Route path="/vehicle/list" element={<VehicleListPage />} />
                  <Route path="/linkVehicle/regist" element={<LinkVehiclePage />} />
                  <Route path="/subcriptionPlan/changePlanPage" element={<ChangePlanPage />} />
                  <Route path="/subscriptions" element={<UserSubscriptionsPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;

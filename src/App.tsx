import React from 'react';
import "./index.css";
import LoginPage from "./features/auth/pages/LoginPage";
import HelloPage from "./HelloPage";

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RegisterPage from "./features/auth/pages/RegisterPage";
import CreateStationPage from "./features/station/pages/CreateStationPage";
import ListStationPage from "./features/station/pages/ListStationPage";
import CreateBatteryPage from "./features/battery/pages/CreateBatteryPage";
import BatteryListPage from "./features/battery/pages/BatteryListPage";
import CreateSubscriptionPlanPage from "./features/subcriptionPlan/pages/CreateSubscriptionPlanPage";
import SubscriptionPlanPage from "./features/subcriptionPlan/pages/SubscriptionPlanPage";
import VehiclePage from "./features/vehicle/pages/VehiclePage";
import VehicleListPage from "./features/vehicle/pages/VehicleListPage";
import NotificationProvider from "./shared/utils/notification/NotificationProvider";
import LinkVehiclePage from "./features/link-subcription/pages/LinkVehiclePage";
import ChangePlanPage from "./features/link-subcription/pages/ChangePlanPage";
import UserSubscriptionsPage from './features/subcription/pages/UserSubscriptionsPage';
function App() {
  return (

      <BrowserRouter>
          <NotificationProvider />
          <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/hello" element={<HelloPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/stations/create" element={<CreateStationPage />} />
              <Route path="/stations/list" element={<ListStationPage />} />
              <Route path="/battery/create" element={<CreateBatteryPage />} />
              <Route path="/battery/list" element={<BatteryListPage />} />
              <Route path="/subcriptionPlan/create" element={<CreateSubscriptionPlanPage />} />
              <Route path="/subcriptionPlan/list" element={<SubscriptionPlanPage />} />
              <Route path="/vehicle/create" element={<VehiclePage />} />
              <Route path="/vehicle/list" element={<VehicleListPage />} />
              <Route path="/linkVehicle/regist" element={<LinkVehiclePage />} />
              <Route path="/subcriptionPlan/changePlanPage" element={<ChangePlanPage/>}/>
              <Route path="/subscriptions" element={<UserSubscriptionsPage/>}/>
          </Routes>


      </BrowserRouter>
  );
}

export default App;

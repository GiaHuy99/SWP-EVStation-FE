import React from 'react';
import "./index.css";
import LoginPage from "./features/auth/pages/LoginPage";

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RegisterPage from "./features/auth/pages/RegisterPage";
import CreateStationPage from "./features/station/pages/CreateStationPage";
import ListStationPage from "./features/station/pages/ListStationPage";
import CreateBatteryPage from "./features/battery/pages/CreateBatteryPage";
import BatteryListPage from "./features/battery/pages/BatteryListPage";
import CreateSubscriptionPlanPage from "./features/subcriptionPlan/pages/CreateSubscriptionPlanPage";
import SubscriptionPlanPage from "./features/subcriptionPlan/pages/SubscriptionPlanPage";
import VehicleCreatePage from "./features/vehicle/pages/VehicleCreatePage";
import VehicleListPage from "./features/vehicle/pages/VehicleListPage";
import VehicleDetailPage from "./features/vehicle/pages/VehicleDetailPage";
import NotificationProvider from "./shared/utils/notification/NotificationProvider";
import LinkVehiclePage from "./features/link-subcription/pages/LinkVehiclePage";
import ChangePlanPage from "./features/link-subcription/components/ChangePlanForm";
import UserSubscriptionsPage from './features/subcription/pages/UserSubscriptionsPage';
import Layout from "./shared/utils/navbar/Layout";
import UserPageLayout from "./shared/utils/layout/UserPageLayout";
import SwapBatteryPage from "./features/swapBattery/pages/SwapBatteryPage";
import HomePage from "./features/home/HomePage";
import BatterySerialListPage from './features/BatterySerials/components/BatterySerialList';
import CreateBatterySerialForm from './features/BatterySerials/components/CreateBatterySerialForm';
import {BaseMap} from "./features/map/components/BaseMap";
import ConfirmPage from "./features/confirmSwap/form/ConfirmPage";
import AnalyticsDashboardPage from "./features/analytics/pages/AnalyticsDashboardPage";
import InvoiceHistory from './features/invoiceHistory/components/InvoiceHistory';
import ProfilePage from './features/profileUser/components/UserProfile';
import UserListPage from './features/user/pages/UserListPage';
import Reservation from './features/reservation/components/PreReserveBattery'
import ReservationHistory from './features/reservation/components/ReservationHistory';
import StaffManagement from "./features/staffManagement/components/StaffManagement";
import StaffLayout from './shared/utils/StaffLayout/StaffLayout';
import BatteryStation from './features/confirmSwap/form/StaffBatteryAtStationList';
import BatteryHistory from'./features/BatterySerials/components/BatteryRecentUpdates';
function App() {
  return (
      <BrowserRouter>
          <NotificationProvider />
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Homepage without Layout (no sidebar) */}
              <Route path="/homepage" element={<HomePage />} />

              {/* User-facing pages with standalone layout */}
              <Route element={<UserPageLayout />}>
                  <Route path="/linkVehicle/regist" element={<LinkVehiclePage />} />
                  <Route path="/subcriptionPlan/changePlanPage" element={<ChangePlanPage />} />
                  <Route path="/subscriptions" element={<UserSubscriptionsPage />} />
                  <Route path="/swapBattery" element={<SwapBatteryPage />} />
                  <Route path="/Map" element={<BaseMap />} />
                  <Route path="/invoice/history" element={<InvoiceHistory />} />
                  <Route path="/user/profile" element={<ProfilePage />} />
                  <Route path="/reservation/preReserve" element={<Reservation />} />
                  <Route path="/reservation/history" element={<ReservationHistory />} />
              </Route>

              {/* Admin pages with sidebar layout */}
              <Route element={<Layout />}>
                  <Route path="/stations/create" element={<CreateStationPage />} />
                  <Route path="/stations/list" element={<ListStationPage />} />
                  <Route path="/battery/create" element={<CreateBatteryPage />} />
                  <Route path="/battery/list" element={<BatteryListPage />} />
                  <Route path="/battery-serials/list" element={< BatterySerialListPage/>} />
                  <Route path="/battery-serials/create" element={<CreateBatterySerialForm/>} />
                  <Route path="/subcriptionPlan/create" element={<CreateSubscriptionPlanPage />} />
                  <Route path="/subcriptionPlan/list" element={<SubscriptionPlanPage />} />
                  <Route path="/vehicle/create" element={<VehicleCreatePage />} />
                  <Route path="/vehicle/list" element={<VehicleListPage />} />
                  <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
                  <Route path="/analytics/dashboard" element={<AnalyticsDashboardPage />} />
                  <Route path="/users/list" element={<UserListPage />} />
                  <Route path="/staff/management" element={<StaffManagement />} />
                  <Route path="/battery-serials/history" element={<BatteryHistory/>}/>
              </Route>
              <Route element={<StaffLayout />}>
                  <Route path="/staff/swap/status" element={<ConfirmPage/>}/>
                  <Route path="/staff/battery/station-list" element={<BatteryStation/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;

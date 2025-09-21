import React from 'react';
import "./index.css";
import LoginPage from "./features/auth/pages/LoginPage";
import HelloPage from "./HelloPage";

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RegisterPage from "./features/auth/pages/RegisterPage";
import CreateStationPage from "./features/station/pages/CreateStationPage";
function App() {
  return (

      <BrowserRouter>

          <Routes>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/hello" element={<HelloPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/stations/create" element={<CreateStationPage />} />

          </Routes>
      </BrowserRouter>

  );
}

export default App;

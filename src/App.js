import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/shared/Login";
import DashboardDirector from "./pages/director/DashboardDirector";
import DashboardDriver from "./pages/driver/DashboardDriver";
import Drivers from "./pages/director/Drivers";
import DriverCreate from "./pages/director/DriverCreate"; // New Page
import DriverEdit from "./pages/director/DriverEdit"; // New Page
import DriverDetails from "./pages/director/DriverDetails"; // New Page
import Missions from "./pages/director/Missions";
import ResetPassword from "./pages/shared/ResetPassword"; // New Page for Password Reset
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Director Dashboard */}
        <Route
          path="/director"
          element={
            <PrivateRoute role="director">
              <DashboardDirector />
            </PrivateRoute>
          }
        />

        {/* Drivers Page */}
        <Route
          path="/director/drivers"
          element={
            <PrivateRoute role="director">
              <Drivers />
            </PrivateRoute>
          }
        />

        {/* Create Driver Page */}
        <Route
          path="/director/drivers/create"
          element={
            <PrivateRoute role="director">
              <DriverCreate />
            </PrivateRoute>
          }
        />

        {/* Edit Driver Page */}
        <Route
          path="/director/drivers/edit/:id"
          element={
            <PrivateRoute role="director">
              <DriverEdit />
            </PrivateRoute>
          }
        />

        {/* Driver Details Page */}
        <Route
          path="/director/drivers/details/:id"
          element={
            <PrivateRoute role="director">
              <DriverDetails />
            </PrivateRoute>
          }
        />

        {/* Missions Page */}
        <Route
          path="/director/missions"
          element={
            <PrivateRoute role="director">
              <Missions />
            </PrivateRoute>
          }
        />

        {/* Reset Password Page */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Driver Dashboard */}
        <Route
          path="/driver"
          element={
            <PrivateRoute role="driver">
              <DashboardDriver />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

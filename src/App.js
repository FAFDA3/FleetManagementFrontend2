import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardDirector from "./pages/DashboardDirector";
import DashboardDriver from "./pages/DashboardDriver";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/director"
          element={
            <PrivateRoute role="director">
              <DashboardDirector />
            </PrivateRoute>
          }
        />
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

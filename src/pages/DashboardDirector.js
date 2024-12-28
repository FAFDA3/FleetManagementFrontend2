import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardDirector = () => {
  const [routes, setRoutes] = useState([]);

  // Fetch routes from the backend
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("https://api.example.com/routes");
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  return (
    <div>
      <h1>Director Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Route ID</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td>{route.id}</td>
              <td>{route.driverName || "Not Assigned"}</td>
              <td>{route.status}</td>
              <td>
                <button onClick={() => alert(`Assign Driver for Route ${route.id}`)}>
                  Assign Driver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardDirector;

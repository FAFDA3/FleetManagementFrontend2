import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardDriver = () => {
  const [assignedRoutes, setAssignedRoutes] = useState([]);

  // Fetch assigned routes for the logged-in driver
  useEffect(() => {
    const fetchAssignedRoutes = async () => {
      try {
        const response = await axios.get("https://api.example.com/driver/routes");
        setAssignedRoutes(response.data);
      } catch (error) {
        console.error("Error fetching driver routes:", error);
      }
    };
    fetchAssignedRoutes();
  }, []);

  const markAsCompleted = async (routeId) => {
    try {
      await axios.put(`https://api.example.com/routes/${routeId}/status`, {
        status: "waiting documentation",
      });
      alert(`Route ${routeId} marked as completed!`);
      setAssignedRoutes((prev) =>
        prev.map((route) =>
          route.id === routeId ? { ...route, status: "waiting documentation" } : route
        )
      );
    } catch (error) {
      console.error("Error updating route status:", error);
    }
  };

  return (
    <div>
      <h1>Driver Dashboard</h1>
      <ul>
        {assignedRoutes.map((route) => (
          <li key={route.id}>
            <strong>Route ID:</strong> {route.id} <br />
            <strong>Status:</strong> {route.status} <br />
            <button
              onClick={() => markAsCompleted(route.id)}
              disabled={route.status !== "active"}
            >
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardDriver;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DirectorHeader from "../../components/DirectorHeader";
import config from "../../config";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          `${config.base_url}/users `,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const driversData = response.data
          .filter((user) => user.role === "driver")
          .sort((a, b) => a.surname.localeCompare(b.surname)); // Sort by surname
        setDrivers(driversData);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setError("Failed to fetch drivers. Please try again.");
      }
    };

    fetchDrivers();
  }, []);

  const handleDriverCreate = () => {
    navigate("/director/drivers/create");
  };

  const handleDriverEdit = (driverId) => {
    navigate(`/director/drivers/edit/${driverId}`);
  };

  const handleViewDetails = (driverId) => {
    navigate(`/director/drivers/details/${driverId}`);
  };

  return (
    <div>
      <DirectorHeader />
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Drivers</h2>
          <button onClick={handleDriverCreate} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Create New Driver
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Driver Surname</th>
              <th style={tableHeaderStyle}>Driver Name</th>
              <th style={tableHeaderStyle}>Driver Email</th>
              <th style={tableHeaderStyle}>Driver ID</th>
              <th style={tableHeaderStyle}>Driving License Expiration</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td style={tableCellStyle}>{driver.surname}</td>
                <td style={tableCellStyle}>{driver.name}</td>
                <td style={tableCellStyle}>{driver.email}</td>
                <td style={tableCellStyle}>{driver.id}</td>
                <td style={tableCellStyle}>{driver.licenseExpiry || "N/A"}</td>
                <td style={tableCellStyle}>
                  <button
                    onClick={() => handleDriverEdit(driver.id)}
                    style={{ ...buttonStyle, backgroundColor: "#007bff" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleViewDetails(driver.id)}
                    style={{ ...buttonStyle, backgroundColor: "#28a745" }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
  backgroundColor: "#f4f4f4",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const buttonStyle = {
  padding: "5px 10px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "5px",
};

export default Drivers;

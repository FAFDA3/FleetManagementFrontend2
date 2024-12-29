import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaTasks, FaMapMarkedAlt } from "react-icons/fa";
import DirectorHeader from "../../components/DirectorHeader";

const DashboardDirector = () => {
  const navigate = useNavigate();

  return (
    <div>
      <DirectorHeader /> {/* Add the header */}
      <h1>Director Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Drivers Page */}
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/director/drivers")}
        >
          <FaUserTie size={50} />
          <p>Drivers</p>
        </div>

        {/* Missions Page */}
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/director/missions")}
        >
          <FaTasks size={50} />
          <p>Missions</p>
        </div>

        {/* Tracking Page */}
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/director/tracking")}
        >
          <FaMapMarkedAlt size={50} />
          <p>Tracking</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardDirector;

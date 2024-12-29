import React, { useState, useEffect } from "react";
import axios from "axios";
import DirectorHeader from "../../components/DirectorHeader"; // Add the header
import config from "../../config";

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get(
          `${config.base_url}/missions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setMissions(response.data);
      } catch (error) {
        console.error("Error fetching missions:", error);
        setError("Failed to fetch missions. Please try again.");
      }
    };

    fetchMissions();
  }, []);

  const handleCreateMission = () => {
    alert("Redirect to create mission form...");
  };

  return (
    <div>
      <DirectorHeader /> {/* Add the header */}
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Missions</h2>
          <button onClick={handleCreateMission} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Create New Mission
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {missions.map((mission) => (
            <li key={mission.id}>
              Mission: {mission.routeDetails} - Status: {mission.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Missions;

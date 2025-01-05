import React, { useState, useEffect } from "react";
import axios from "axios";
import DirectorHeader from "../../components/DirectorHeader";
import config from "../../config";
import EditMission from "../../components/EditMission"; // Importa il componente riutilizzabile

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [error, setError] = useState("");
  const [expandedMissionId, setExpandedMissionId] = useState(null);
  const [editMissionId, setEditMissionId] = useState(null);
  const [showCreateMission, setShowCreateMission] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`${config.base_url}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const driverData = response.data.filter((user) => user.role === "driver");
        setDrivers(driverData);
      } catch (err) {
        console.error("Error fetching drivers:", err);
      }
    };

    fetchDrivers();
  }, []);

  const fetchMissions = async () => {
    try {
      const response = await axios.get(`${config.base_url}/routes/filter`, {
        params: {
          driverId: selectedDrivers.join(","),
          departureDate: departureDate || undefined,
          arrivalDate: arrivalDate || undefined,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMissions(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching missions:", err);
      setMissions([]);
      setError("No missions found.");
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [selectedDrivers, departureDate, arrivalDate]);

  const handleDriverSelection = (driverId) => {
    setSelectedDrivers((prev) => {
      if (prev.includes(driverId)) {
        return prev.filter((id) => id !== driverId);
      } else {
        return [...prev, driverId];
      }
    });
  };

  const handleDeleteMission = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mission?")) {
      return;
    }
    try {
      await axios.delete(`${config.base_url}/routes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Mission deleted successfully!");
      fetchMissions();
    } catch (err) {
      console.error("Error deleting mission:", err);
      alert("Failed to delete mission.");
    }
  };

  const toggleDetails = (id) => {
    setExpandedMissionId((prev) => (prev === id ? null : id));
  };

  const handleUpdateMission = async (id, updatedData) => {
    try {
      await axios.put(`${config.base_url}/routes/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Mission updated successfully!");
      fetchMissions();
      setEditMissionId(null);
    } catch (err) {
      console.error("Error updating mission:", err);
      alert("Failed to update mission.");
    }
  };

  const handleCreateMission = async (newMissionData) => {
    try {
      await axios.post(`${config.base_url}/routes`, newMissionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Mission created successfully!");
      fetchMissions();
      setShowCreateMission(false);
    } catch (err) {
      console.error("Error creating mission:", err);
      alert("Failed to create mission.");
    }
  };

  return (
    <div>
      <DirectorHeader />
      <div style={{ padding: "20px" }}>
        <h2>Missions</h2>
        <div style={{ marginBottom: "20px", textAlign: "right" }}>
          <button
            onClick={() => setShowCreateMission(true)}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create Mission
          </button>
        </div>
        {showCreateMission && (
          <EditMission
            drivers={drivers}
            onSave={handleCreateMission}
            onCancel={() => setShowCreateMission(false)}
          />
        )}
        <div style={{ marginBottom: "20px" }}>
          <label>Filter by Drivers:</label>
          <div
            style={{
              maxHeight: "150px",
              overflowY: "scroll",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {drivers.map((driver) => (
              <div key={driver.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDrivers.includes(driver.id)}
                    onChange={() => handleDriverSelection(driver.id)}
                  />
                  {driver.name} {driver.surname}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Filter by Departure Date:</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Filter by Arrival Date:</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>
        <button onClick={() => fetchMissions()} style={{ marginBottom: "20px" }}>
          Refresh Missions
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Mission ID</th>
              <th>Driver Name</th>
              <th>Start Point</th>
              <th>End Point</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <React.Fragment key={mission.id}>
                <tr>
                  <td>{mission.id}</td>
                  <td>
                    {drivers.find((d) => d.id === mission.driverId)?.name || "Unknown"}{" "}
                    {drivers.find((d) => d.id === mission.driverId)?.surname || ""}
                  </td>
                  <td>{mission.startPoint}</td>
                  <td>{mission.endPoint}</td>
                  <td>{mission.status}</td>
                  <td>
                    <button onClick={() => toggleDetails(mission.id)}>Details</button>
                    <button onClick={() => setEditMissionId(mission.id)}>Modify</button>
                    <button onClick={() => handleDeleteMission(mission.id)}>Delete</button>
                  </td>
                </tr>
                {expandedMissionId === mission.id && (
                  <tr>
                    <td colSpan="6">
                      <div>
                        <p>Route Details: {mission.routeDetails}</p>

                        <p>
                          Waypoints:{" "}
                          {mission.waypoints.length > 0 ? (
                            <ul>
                              {mission.waypoints.map((wp, index) => (
                                <li key={index}>{wp}</li>
                              ))}
                            </ul>
                          ) : (
                            "No waypoints added."
                          )}
                        </p>
                        
                        <p>Start Time: {mission.startTime}</p>
                        <p>End Time: {mission.endTime}</p>
                        <p>Truck: {mission.truck}</p>
                        <p>Trailer: {mission.trailer}</p>
                      </div>
                    </td>
                  </tr>
                )}
                {editMissionId === mission.id && (
                  <tr>
                    <td colSpan="6">
                      <EditMission
                        mission={mission}
                        drivers={drivers}
                        onSave={(updatedData) =>
                          handleUpdateMission(mission.id, updatedData)
                        }
                        onCancel={() => setEditMissionId(null)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Missions;

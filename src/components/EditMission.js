import React, { useState } from "react";

const EditMission = ({ mission, onSave, onCancel, drivers }) => {
  const [formData, setFormData] = useState({
    startPoint: mission?.startPoint || "",
    endPoint: mission?.endPoint || "",
    status: mission?.status || "waiting to acceptation",
    startTime: mission?.startTime || "",
    endTime: mission?.endTime || "",
    truck: mission?.truck || "",
    trailer: mission?.trailer || "",
    driverId: mission?.driverId || "",
    routeDetails: mission?.routeDetails || "",
    waypoints: mission?.waypoints || [], // Assuming waypoints is already an array
  });

  const [newWaypoint, setNewWaypoint] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWaypointAdd = () => {
    if (newWaypoint.trim() === "") return;
    setFormData({
      ...formData,
      waypoints: [...formData.waypoints, newWaypoint],
    });
    setNewWaypoint(""); // Clear the input
  };

  const handleWaypointRemove = (index) => {
    const updatedWaypoints = formData.waypoints.filter((_, i) => i !== index);
    setFormData({ ...formData, waypoints: updatedWaypoints });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert waypoints array to JSON string only if required by backend
    const updatedFormData = {
      ...formData,
      waypoints: formData.waypoints, // Ensure it remains an array
    };
    onSave(updatedFormData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
      <div>
        <label>Start Point:</label>
        <input
          type="text"
          name="startPoint"
          value={formData.startPoint}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Point:</label>
        <input
          type="text"
          name="endPoint"
          value={formData.endPoint}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Route Details:</label>
        <textarea
          name="routeDetails"
          value={formData.routeDetails}
          onChange={handleChange}
          required
          style={{ width: "100%", minHeight: "50px" }}
        />
      </div>
      <div>
        <label>Waypoints:</label>
        <div>
          <input
            type="text"
            value={newWaypoint}
            onChange={(e) => setNewWaypoint(e.target.value)}
            placeholder="Enter waypoint address"
            style={{ width: "80%" }}
          />
          <button
            type="button"
            onClick={handleWaypointAdd}
            style={{ marginLeft: "10px", padding: "5px 10px" }}
          >
            Add
          </button>
        </div>
        <ul style={{ marginTop: "10px", listStyleType: "none", padding: 0 }}>
          {formData.waypoints.map((waypoint, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {waypoint}
              <button
                type="button"
                onClick={() => handleWaypointRemove(index)}
                style={{
                  marginLeft: "10px",
                  padding: "2px 5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="waiting to acceptation">Waiting to Acceptation</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
          <option value="waiting documentation">Waiting Documentation</option>
        </select>
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Truck:</label>
        <input
          type="text"
          name="truck"
          value={formData.truck}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Trailer:</label>
        <input
          type="text"
          name="trailer"
          value={formData.trailer}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Driver:</label>
        <select name="driverId" value={formData.driverId} onChange={handleChange}>
          <option value="" disabled>Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name} {driver.surname}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMission;

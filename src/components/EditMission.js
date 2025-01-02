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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name} {driver.surname}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMission;

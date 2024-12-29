import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DirectorHeader from "../../components/DirectorHeader";
import config from "../../config";

const DriverCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    licenseNumber: "",
    licenseExpiry: "",
    tachographCardNumber: "",
    tachographCardExpiry: "",
    idDocument: "",
    whatsappNumber: "",
    companyId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${config.base_url}/users`,
        { ...formData, role: "driver" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Driver created successfully!");
      navigate("/director/drivers");
    } catch (error) {
      console.error("Error creating driver:", error);
      alert("Failed to create driver.");
    }
  };

  return (
    <div>
      <DirectorHeader />
      <div style={{ padding: "20px" }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: "10px" }}>
          Back
        </button>
        <h2>Create New Driver</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <label>
                <strong>{key}:</strong>
              </label>
              <input
                type={key.includes("Expiry") ? "date" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                required={!["idDocument", "whatsappNumber", "companyId"].includes(key)}
              />
            </div>
          ))}
          <button type="submit">Create Driver</button>
        </form>
      </div>
    </div>
  );
};

export default DriverCreate;

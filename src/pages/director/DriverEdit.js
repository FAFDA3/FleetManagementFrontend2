import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DirectorHeader from "../../components/DirectorHeader";
import config from "../../config";

const DriverEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [resetPasswordStatus, setResetPasswordStatus] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // Per la conferma di eliminazione

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(
          `${config.base_url}/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching driver details:", error);
        alert("Failed to fetch driver details.");
      }
    };

    fetchDriver();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${config.base_url}/users/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Driver updated successfully!");
      navigate("/director/drivers");
    } catch (error) {
      console.error("Error updating driver:", error);
      alert("Failed to update driver.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        `${config.base_url}/users/${id}/request-reset`,
        {}, // No body needed
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResetPasswordStatus("Password reset email sent successfully.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setResetPasswordStatus("Failed to send password reset email.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${config.base_url}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Driver deleted successfully!");
      navigate("/director/drivers");
    } catch (error) {
      console.error("Error deleting driver:", error);
      alert("Failed to delete driver.");
    }
  };

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <DirectorHeader />
      <div style={{ padding: "20px" }}>
        <h2>Edit Driver</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <label>
                <strong>{key}:</strong>
              </label>
              <input
                type="text"
                name={key}
                value={value || ""}
                onChange={handleChange}
                disabled={["id", "role", "password"].includes(key)} // Disable fields you don't want to edit
              />
            </div>
          ))}
          <button type="submit" style={{ marginRight: "10px" }}>
            Update Driver
          </button>
        </form>

        <button
          onClick={handleResetPassword}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reset Password
        </button>

        {resetPasswordStatus && (
          <p
            style={{
              marginTop: "10px",
              color: resetPasswordStatus.includes("Failed") ? "red" : "green",
            }}
          >
            {resetPasswordStatus}
          </p>
        )}

        <button
          onClick={confirmDelete}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Delete Driver
        </button>

        {showConfirmation && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#f8d7da",
              border: "1px solid red",
              color: "#721c24",
            }}
          >
            <p>Are you sure you want to delete this driver?</p>
            <button
              onClick={handleDelete}
              style={{
                marginRight: "10px",
                padding: "10px 20px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Confirm
            </button>
            <button
              onClick={cancelDelete}
              style={{
                padding: "10px 20px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverEdit;

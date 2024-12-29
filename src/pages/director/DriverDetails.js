import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DirectorHeader from "../../components/DirectorHeader";
import config from "../../config";

const DriverDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);

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
        setDriver(response.data);
      } catch (error) {
        console.error("Error fetching driver details:", error);
        alert("Failed to fetch driver details.");
      }
    };

    fetchDriver();
  }, [id]);

  if (!driver) return <p>Loading...</p>;

  return (
    <div>
      <DirectorHeader />
      <div style={{ padding: "20px" }}>

        <h2>Driver Details</h2>
        <ul>
          {Object.entries(driver).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value || "N/A"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DriverDetails;

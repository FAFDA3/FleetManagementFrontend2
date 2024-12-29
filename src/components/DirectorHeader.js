import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";

const DirectorHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token or session
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // Redirect to login page
  };

  return (
    <header style={headerStyle}>
      {/* Home Button */}
      <div style={iconStyle} onClick={() => navigate("/director")}>
        <FaHome size={24} />
        <span>Home</span>
      </div>

      {/* Back Button */}
      <div style={backButtonStyle} onClick={() => navigate(-1)}>
        <FaArrowLeft size={18} />
        <span>Back</span>
      </div>

      {/* Logout Button */}
      <div style={iconStyle} onClick={handleLogout}>
        <span>Logout</span>
        <FaSignOutAlt size={24} />
      </div>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
};

const iconStyle = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  gap: "5px",
};

const backButtonStyle = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  gap: "5px",
  padding: "5px 10px",
  backgroundColor: "white",
  color: "#007bff",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

export default DirectorHeader;

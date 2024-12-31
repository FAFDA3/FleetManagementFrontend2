import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";


const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log('enpoint di reset: ' , `${config.base_url}/users/reset-password/${token}`);
      const response = await axios.post(
        `${config.base_url}/users/reset-password/${token}`,
        { newPassword }
      );
      alert(response.data.message);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Reset Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            New Password:
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  fontSize: "16px",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Confirm Password:
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

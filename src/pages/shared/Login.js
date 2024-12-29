import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("driver"); // Default: Driver
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Dynamic endpoint based on user type
      const endpoint =
        userType === "driver"
          ? `${config.base_url}/auth/login`
          : `${config.base_url}/auth/login/director`;

      const response = await axios.post(endpoint, { email, password });

      const { token, role } = response.data;

      // Save the token and role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redirect to the correct dashboard
      if (role === "driver") {
        navigate("/driver");
      } else if (role === "director") {
        navigate("/director");
      } else {
        setError("Unknown role. Contact the administrator.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Login</h1>

      {/* User Type Selector */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setUserType("driver")}
          style={{
            background: userType === "driver" ? "lightblue" : "white",
            border: "1px solid lightgray",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Driver
        </button>
        <button
          onClick={() => setUserType("director")}
          style={{
            background: userType === "director" ? "lightblue" : "white",
            border: "1px solid lightgray",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Director
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px", position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default Login;

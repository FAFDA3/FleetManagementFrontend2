import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("driver"); // Default: Driver
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Endpoint dinamico in base al tipo di utente
      const endpoint =
        userType === "driver"
          ? `${config.base_url}/auth/login`
          : `${config.base_url}/auth/login/director`;

      const response = await axios.post(endpoint, { email, password });

      const { token, role } = response.data;

      // Salva il token e il ruolo
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Reindirizza alla dashboard corretta
      if (role === "driver") {
        navigate("/driver");
      } else if (role === "director") {
        navigate("/director");
      } else {
        setError("Ruolo sconosciuto. Contatta l'amministratore.");
      }
    } catch (err) {
      console.error(err);
      setError("Credenziali non valide.");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* Selettore per scegliere il tipo di login */}
      <div>
        <button
          onClick={() => setUserType("driver")}
          style={{ background: userType === "driver" ? "lightblue" : "white" }}
        >
          Driver
        </button>
        <button
          onClick={() => setUserType("director")}
          style={{ background: userType === "director" ? "lightblue" : "white" }}
        >
          Director
        </button>
      </div>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;

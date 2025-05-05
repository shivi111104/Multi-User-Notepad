// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import { useAuth } from "../context/AuthContext";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate(); // <-- Initialize navigate
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, username, password);
      alert("Registration successful! Please log in.");
      navigate("/login"); // <-- Redirect to login
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert(
        "Registration failed: " +
          (err.response?.data?.message || "Check console for details.")
      );
    }
  };

  return (
    <div className="register-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

// src/pages/Landing.jsx
import React from "react";
import "../styles/Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <h1>Welcome to Collaborative Notepad</h1>
      <p>Create and collaborate on documents in real time.</p>
      <div className="buttons">
        <Link to="/login">
          <button className="primary-btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="secondary-btn">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;

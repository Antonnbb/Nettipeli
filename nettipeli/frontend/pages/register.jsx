import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./authentication.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post("http://localhost:3001/register", {
      username,
      password,
    });

    window.location.href = "/login";
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-card">
        <Link to="/home" className="auth-close">×</Link>

        <div className="auth-icon">⚡</div>
        <h1>Join ReactionLab</h1>
        <p className="auth-subtitle">Create an account to get started</p>

        <label>Username</label>
        <input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Sign Up</button>

        <p className="auth-link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
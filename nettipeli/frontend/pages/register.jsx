import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "./Toast";
import "./authentication.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const register = async () => {
  if (!username || !password) {
    setToast({ message: "Please fill all fields", type: "error" });
    return;
  }

  if (password.length < 6) {
    setToast({ message: "Password must be at least 6 characters", type: "error" });
    return;
  }

  try {
    await axios.post("http://localhost:3001/register", {
      username,
      password,
    });

    setToast({ message: "User created successfully!", type: "success" });

    setTimeout(() => {
      window.location.href = "/login";
    }, 1200);
  } catch (err) {
    setToast({
      message: "Username already taken",
      type: "error",
    });
  }
};

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-card">
        <Link to="/home" className="auth-close">×</Link>

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

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
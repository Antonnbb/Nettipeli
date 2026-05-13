import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./authentication.css";
import Toast from "./toast.jsx";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState(null);

    const login = async () => {
        if (!username || !password) {
            setToast({ message: "Please fill all fields", type: "error" });
            return;
        }

        try {
            const res = await axios.post("http://localhost:3001/login", {
                username,
                password,
            });

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);

            setToast({ message: "Login successful!", type: "success" });

            setTimeout(() => {
                window.location.href = "/home";
            }, 1200);

        } catch {
            setToast({ message: "Invalid username or password", type: "error" });
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-overlay"></div>

            <div className="auth-card">
                <Link to="/home" className="auth-close">×</Link>

                <h1>Welcome Back!</h1>
                <p className="auth-subtitle">Login to continue your journey</p>

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

                <button onClick={login}>Login</button>

                <p className="auth-link-text">
                    Don't have an account? <Link to="/register">Sign Up</Link>
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
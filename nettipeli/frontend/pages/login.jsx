import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const res = await axios.post("http://localhost:3001/login", {
            username,
            password,
        });

        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        alert("Kirjauduttu sisään!");

        window.location.href = "/home";
    };


    return (
        <div>
            <h1>Login</h1>

            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>Login</button>
            <p>
                Ei tiliä? <Link to="/register">Rekisteröidy</Link>
            </p>
        </div>
    );
}
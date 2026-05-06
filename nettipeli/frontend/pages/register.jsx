import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post("http://localhost:3001/register", {
      username,
      password,
    });

    alert("Käyttäjä luotu! Voit nyt kirjautua.");
    window.location.href = "/login";
  };


  return (
    <div>
      <h1>Register</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>
    </div>
  );
}
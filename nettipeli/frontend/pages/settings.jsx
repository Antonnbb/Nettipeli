import { useState, useEffect } from "react";
import Navbar from "./navbar";

export default function Settings() {
  const [sensitivity, setSensitivity] = useState(5);

  useEffect(() => {
    const saved = localStorage.getItem("sensitivity");
    if (saved) setSensitivity(Number(saved));
  }, []);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setSensitivity(value);
    localStorage.setItem("sensitivity", value);
  };
  
  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>⚙️ Settings</h1>

        <p>Sensitivity: {sensitivity}</p>

        <input
          type="range"
          min="1"
          max="10"
          value={sensitivity}
          onChange={handleChange}
          style={{ width: "300px" }}
        />
      </div>
    </>
  );
}
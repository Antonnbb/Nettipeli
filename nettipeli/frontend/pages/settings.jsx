import { useState, useEffect } from "react";
import Navbar from "./navbar";
import "./settings.css";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const value = !darkMode;
    setDarkMode(value);
    localStorage.setItem("darkMode", value);
    document.body.classList.toggle("dark", value);
  };

  return (
    <>
      <Navbar />

      <div className="settings-page">
        <div className="settings-card">
          <h1>⚙️ Settings</h1>

          <div className="setting-box">
            <h2>🌙 Dark Mode</h2>

            <button onClick={toggleDarkMode}>
              {darkMode ? "Disable" : "Enable"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
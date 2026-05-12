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
          <p className="settings-sub">Customize your experience</p>

          <div className="settings-grid">
            
            {/* DARK MODE */}
            <div className="setting-box">
              <div className="setting-header">
                <span>🌙</span>
                <h2>Dark Mode</h2>
              </div>

              <p>Switch between light and dark theme</p>

              <button onClick={toggleDarkMode}>
                {darkMode ? "Disable" : "Enable"}
              </button>
            </div>

            {/* EXTRA (valmis lisäykseen myöhemmin) */}
            <div className="setting-box">
              <div className="setting-header">
                <span>🎨</span>
                <h2>Theme</h2>
              </div>

              <p>More customization options coming soon...</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
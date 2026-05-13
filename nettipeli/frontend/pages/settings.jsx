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

  const [cursorStyle, setCursorStyle] = useState(
    localStorage.getItem("cursorStyle") || "default"
  );

  const changeCursorStyle = (style) => {
    setCursorStyle(style);
    localStorage.setItem("cursorStyle", style);
  };


  return (
  <>
    <Navbar />

    <div className="settings-page">
      <div className="settings-card">
        <h1>⚙️ Settings</h1>
        <p className="settings-sub">Customize your experience</p>

        <div className="settings-grid">
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

          <div className="setting-box">
            <div className="setting-header">
              <span>🎯</span>
              <h2>Cursor Style</h2>
            </div>

            <p>Choose your aim cursor style</p>

            <select
              value={cursorStyle}
              onChange={(e) => changeCursorStyle(e.target.value)}
              className="settings-select"
            >
              <option value="default">Default</option>
              <option value="dot">Dot</option>
              <option value="crosshair">Crosshair</option>
              <option value="circle">Circle</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </>
);
}
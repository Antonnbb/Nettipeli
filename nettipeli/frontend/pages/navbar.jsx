import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/home";
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">
        <span>ReactionLab</span>
      </Link>
      

      <div className="nav-right">
        {!user ? (
          <Link to="/login">
            <button className="login-btn">Login / Sign Up</button>
          </Link>
        ) : (
          <>
            <div className="user-box">
              <Link to="/profile">👤 {user?.username}</Link>
            </div>

            <button onClick={logout} className="logout-btn">
              ↪ Logout
            </button>
          </>
        )}

        <Link to="/settings" className="settings-link">
        ⚙️ Settings
      </Link>
      </div>
    </nav>
  );
}
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">
        <span>ReactionLab</span>
      </Link>

      <div className="nav-right">
        <div className="user-box">👤 {user?.username}</div>

        <button onClick={logout} className="logout-btn">
          ↪ Logout
        </button>
      </div>
    </nav>
  );
}
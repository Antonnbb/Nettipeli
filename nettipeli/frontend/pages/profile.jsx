import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import "./profile.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:3001/profile-stats/${user.id}`)
      .then((res) => setStats(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">👤</div>
          <h1>{user?.username}</h1>
          <p className="profile-subtitle">ReactionLab Player</p>

          <div className="profile-stats">
            <div>
              <span>⚡</span>
              <h3>Reaction</h3>
              <p>{stats?.reaction ? `${stats.reaction.reaction_time} ms` : "---"}</p>
            </div>

            <div>
              <span>🎯</span>
              <h3>Aim</h3>
              <p>{stats?.aim ? `${stats.aim.accuracy}%` : "---"}</p>
            </div>

            <div>
              <span>◎</span>
              <h3>Tracking</h3>
              <p>{stats?.tracking ? stats.tracking.score : "---"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import "./profile.css";
import { getAimRank, getTrackingRank, getRankIcon, getReactionRank } from "./rank";

export default function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [stats, setStats] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const aimRank = getAimRank(stats?.aim?.score || 0);
    const trackingRank = getTrackingRank(stats?.tracking?.score || 0);
    const reactionRank = getReactionRank(stats?.reaction?.reaction_time || 999);

    useEffect(() => {
        if (!user) return;

        axios
            .get(`http://localhost:3001/profile-stats/${user.id}`)
            .then((res) => setStats(res.data));
    }, []);

    const changeUsername = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!newUsername) return;

        const res = await axios.put("http://localhost:3001/profile/username", {
            user_id: user.id,
            username: newUsername,
        });

        const updatedUser = res.data;

        localStorage.setItem("user", JSON.stringify(updatedUser));

        window.location.reload();
    };

    return (
        <>
            <Navbar />

            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-avatar">👤</div>
                    <h1>{user?.username}</h1>
                    <p className="profile-subtitle">ReactionLab Player</p>

                    <div className="username-change">
                        <input
                            type="text"
                            placeholder="New username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />

                        <button onClick={changeUsername}>
                            Change Username
                        </button>
                    </div>
                    <div className="rank-container">
                        <div className={`rank-box ${reactionRank}`}>
                            ⚡ {getRankIcon(reactionRank)}
                            <span>Reaction</span>
                            <strong>{reactionRank}</strong>
                        </div>

                        <div className={`rank-box ${aimRank}`}>
                            🎯 {getRankIcon(aimRank)}
                            <span>Aim</span>
                            <strong>{aimRank}</strong>
                        </div>

                        <div className={`rank-box ${trackingRank}`}>
                            ◎ {getRankIcon(trackingRank)}
                            <span>Tracking</span>
                            <strong>{trackingRank}</strong>
                        </div>
                    </div>
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
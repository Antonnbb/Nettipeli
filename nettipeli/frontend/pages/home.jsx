import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  const goToGame = (path) => {
    const user = localStorage.getItem("user");
    if (!user) return navigate("/login");
    navigate(path);
  };

  return (
    <>
      <Navbar />

      <div className="home">
        <h1>Welcome to ReactionLab</h1>
        <h2>Test and improve your reaction time, tracking, and aim</h2>
        <p>Challenge yourself and compete on the leaderboards!</p>

        <div className="card-container">
          <div className="card blue">
            <div className="icon">⚡</div>
            <h3>Reaction Test</h3>
            <p>Test how fast you can react when the screen changes color</p>
            <button onClick={() => goToGame("/reaction")}>Play Now</button>
            <button className="leader" onClick={() => navigate("/leaderboard")}>🏆 Leaderboard</button>
          </div>

          <div className="card purple">
            <div className="icon">🎯</div>
            <h3>Tracking Test</h3>
            <p>Keep your cursor on a moving target for as long as possible</p>
            <button onClick={() => goToGame("/tracking")}>Play Now</button>
            <button className="leader" onClick={() => navigate("/leaderboard")}>🏆 Leaderboard</button>
          </div>

          <div className="card pink">
            <div className="icon">🎪</div>
            <h3>Aim Training</h3>
            <p>Click on targets as accurately as possible within the time limit</p>
            <button onClick={() => goToGame("/aim")}>Play Now</button>
            <button className="leader" onClick={() => navigate("/leaderboard")}>🏆 Leaderboard</button>
          </div>
        </div>
      </div>
    </>
  );
}
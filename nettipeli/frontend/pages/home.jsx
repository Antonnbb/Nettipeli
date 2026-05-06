import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <h2>Challenge yourself and compete on the leaderboards!</h2>

      <div className="card-container">
        <div className="card">
          <h3>Reaction Test</h3>
          <p>Test how fast you can react</p>
          <Link to="/reaction">
            <button>Play Now</button>
          </Link>
        </div>

        <div className="card">
          <h3>Tracking Test</h3>
          <p>Keep cursor on moving target</p>
          <Link to="/tracking">
            <button>Play Now</button>
          </Link>
        </div>

        <div className="card">
          <h3>Aim Training</h3>
          <p>Click targets fast</p>
          <Link to="/aim">
            <button>Play Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
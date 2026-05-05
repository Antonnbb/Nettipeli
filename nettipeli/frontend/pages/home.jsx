import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>ReactionLab</h1>
      <Link to="/tracking">Tracking Test</Link><br />
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
  );
}
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import "./leaderboard.css";

export default function Leaderboard({ game }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/scores/${game}`)
      .then((res) => setScores(res.data))
      .catch((err) => console.error(err));
  }, [game]);

  return (
    <>
      <Navbar />

      <div className="leaderboard-page">
        <div className="leaderboard-card">
          <h1>{game} Leaderboard</h1>

          {scores.length === 0 ? (
            <p>Ei tuloksia vielä.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Käyttäjä</th>

                  {game === "reaction" ? (
                    <th>Reaction Time</th>
                  ) : game === "aim" ? (
                    <>
                      <th>Hits</th>
                      <th>Accuracy</th>
                    </>
                  ) : (
                    <>
                      <th>Score</th>
                      <th>Accuracy</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody>
                {scores.map((s, i) => (
                  <tr className={`rank-${i + 1}`} key={i}>
                    <td>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </td>
                    <td>{s.profiles?.username || "Unknown"}</td>

                    {game === "reaction" ? (
                      <td>{s.reaction_time} ms</td>
                    ) : (
                      <>
                        <td>{s.score}</td>
                        <td>{s.accuracy}%</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
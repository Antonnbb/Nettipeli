import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";

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

      <div>
        <h1>{game} Leaderboard</h1>

        {scores.length === 0 ? (
          <p>Ei tuloksia vielä.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Käyttäjä</th>
                <th>Accuracy</th>
              </tr>
            </thead>

            <tbody>
              {scores.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s.profiles?.username}</td>
                  <td>{s.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
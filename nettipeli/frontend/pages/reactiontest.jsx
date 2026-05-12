import { useState } from "react";
import "./reactiontest.css";

export default function ReactionTest() {
  const [state, setState] = useState("idle");
  const [startTime, setStartTime] = useState(0);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("Click Anywhere to Start");
  const [subMessage, setSubMessage] = useState("Wait for green, then click!");
  const [timeoutId, setTimeoutId] = useState(null);
  const [best, setBest] = useState(null);
  const [average, setAverage] = useState(null);
  const [finished, setFinished] = useState(false);

  const startRound = () => {
    setState("waiting");
    setMessage("Wait for green...");
    setSubMessage("Don’t click yet!");

    const delay = Math.random() * 4000 + 3000;

    const id = setTimeout(() => {
      setState("ready");
      setStartTime(Date.now());
      setMessage("CLICK!");
      setSubMessage("Click now!");
    }, delay);

    setTimeoutId(id);
  };

  const handleClick = async () => {
    if (finished) return;

    if (state === "idle") {
      startRound();
      return;
    }

    if (state === "waiting") {
      clearTimeout(timeoutId);
      setMessage("Too soon!");
      setSubMessage("Wait for green next time");

      setTimeout(startRound, 800);
      return;
    }

    if (state === "ready") {
      const time = Date.now() - startTime;
      const newResults = [...results, time];

      setMessage(`${time} ms`);
      setSubMessage("Nice reaction!");

      if (newResults.length === 5) {
        const avg = newResults.reduce((a, b) => a + b, 0) / newResults.length;
        const bestTime = Math.min(...newResults);

        setAverage(Math.round(avg));
        setBest(bestTime);
        setFinished(true);
        setResults([]);
        setState("idle");

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
          await fetch("http://localhost:3001/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              game_type: "reaction",
              score: Math.round(avg),
              accuracy: null,
              reaction_time: Math.round(avg),
              duration: 5,
            }),
          });
        }
      } else {
        setResults(newResults);
        setState("idle");
        setTimeout(startRound, 1000);
      }
    }
  };

  const restart = () => {
    setResults([]);
    setBest(null);
    setAverage(null);
    setFinished(false);
    setMessage("Click Anywhere to Start");
    setSubMessage("Wait for green, then click!");
    setState("idle");
  };

  return (
    <>

      <div className="rt-page">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back to Home
        </button>

        <h1>⚡ Reaction Test</h1>
        <p>Click as quickly as you can when the screen turns green</p>

        <div className="rt-stats">
          <div className="stat">
            <span>Best Time</span>
            <strong>{best ? `${best} ms` : "---"}</strong>
          </div>

          <div className="stat">
            <span>Average</span>
            <strong>{average ? `${average} ms` : "---"}</strong>
          </div>

          <div className="stat">
            <span>Attempts</span>
            <strong>{results.length}/5</strong>
          </div>
        </div>

        <div className={`rt-box ${state}`} onClick={handleClick}>
          <h2>{message}</h2>
          <p>{subMessage}</p>
        </div>

        {finished && (
          <button onClick={restart} className="play-again-btn">
            Play Again
          </button>
        )}
      </div>
    </>
  );
}
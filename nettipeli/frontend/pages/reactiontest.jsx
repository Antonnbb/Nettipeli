import { useState } from "react";
import './reactiontest.css';

export default function ReactionTest() {
  const [state, setState] = useState("idle");
  const [startTime, setStartTime] = useState(0);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("Click Anywhere to Start");

  const [timeoutId, setTimeoutId] = useState(null);

  const startRound = () => {
    setState("waiting");
    setMessage("Wait for green...");

    const delay = Math.random() * 4000 + 3000;

    const id = setTimeout(() => {
      setState("ready");
      setStartTime(Date.now());
      setMessage("CLICK!");
    }, delay);

    setTimeoutId(id);
  };

  const handleClick = async () => {
    if (state === "idle") {
      startRound();
      return;
    }

    if (state === "waiting") {
      clearTimeout(timeoutId);
      setMessage("Too soon!");
      setTimeout(startRound, 1000);
      return;
    }

    if (state === "ready") {
      const time = Date.now() - startTime;
      const newResults = [...results, time];

      setMessage(`${time} ms`);

      if (newResults.length === 5) {
        const avg =
          newResults.reduce((a, b) => a + b, 0) / newResults.length;

        setTimeout(() => {
          setMessage(`Average: ${Math.round(avg)} ms`);
        }, 1000);

        setResults([]);
        setState("idle");
      } else {
        setResults(newResults);
        setState("idle");
        setTimeout(startRound, 1000);
      }
    }
  };

  return (
    <div className="rt-page">
      <h2>⚡ Reaction Test</h2>
      <p>Click as quickly as you can when the screen turns green</p>

      <div className="rt-stats">
        <div className="stat">Best Time<br />---</div>
        <div className="stat">Average<br />---</div>
        <div className="stat">Attempts<br />{results.length}</div>
      </div>

      <div
        className={`rt-box ${state}`}
        onClick={handleClick}
      >
        {message}
      </div>
    </div>
  );
}
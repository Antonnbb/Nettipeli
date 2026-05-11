import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./aimtraining.css";

export default function AimTraining() {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [best, setBest] = useState(
    Number(localStorage.getItem("aimBestAcc")) || 0
  );
  const [target, setTarget] = useState({ x: 300, y: 180 });
  const [clicks, setClicks] = useState(0);
  const [misses, setMisses] = useState(0);

  const scoreRef = useRef(0);
  const clicksRef = useRef(0);

  const accuracy =
    clicks > 0 ? Math.max(0, Math.round((score / clicks) * 100)) : 0;

  const randomTarget = () => {
    setTarget({
      x: Math.random() * 830,
      y: Math.random() * 350,
    });
  };

  const hitTarget = (e) => {
    e.stopPropagation();
    if (!isRunning) return;

    scoreRef.current += 1;
    clicksRef.current += 1;

    setScore(scoreRef.current);
    setClicks(clicksRef.current);

    randomTarget();
  };

  const missTarget = () => {
    if (!isRunning) return;

    clicksRef.current += 1;

    setClicks(clicksRef.current);
    setMisses((prev) => prev + 1);

    randomTarget();
  };

  const startGame = () => {
    scoreRef.current = 0;
    clicksRef.current = 0;

    setScore(0);
    setClicks(0);
    setMisses(0);
    setTimeLeft(30);
    setIsRunning(true);

    randomTarget();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);

          const finalAccuracy =
            clicksRef.current > 0
              ? Math.round((scoreRef.current / clicksRef.current) * 100)
              : 0;

          if (finalAccuracy > best) {
            setBest(finalAccuracy);
            localStorage.setItem("aimBestAcc", finalAccuracy);
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="aim-page">
      <button className="back-btn" onClick={() => navigate("/home")}>
        ← Back to Home
      </button>

      <h1>🎪 Aim Training</h1>
      <p>Click on the targets as accurately as possible</p>

      <div className="aim-stats">
        <div>Time Left<br /><span>{timeLeft}s</span></div>
        <div>Hits<br /><span>{score}</span></div>
        <div>Accuracy<br /><span>{accuracy}%</span></div>
        <div>Best<br /><span>{best ? best + "%" : "---"}</span></div>
      </div>

      <div className="aim-area" onClick={missTarget}>
        {!isRunning && timeLeft === 30 && (
          <button className="aim-start-btn" onClick={startGame}>
            Start Test
          </button>
        )}

        {!isRunning && timeLeft === 0 && (
          <div className="aim-result-box">
            <div className="aim-result-icon">🎯</div>

            <h2>
              Final Accuracy: <span>{accuracy}%</span>
            </h2>

            <p>{score} hits out of {clicks} clicks</p>

            <button className="aim-start-btn" onClick={startGame}>
              Play Again
            </button>
          </div>
        )}

        {isRunning && (
          <button
            className="target"
            onClick={hitTarget}
            style={{ left: target.x, top: target.y }}
          />
        )}
      </div>
    </div>
  );
}
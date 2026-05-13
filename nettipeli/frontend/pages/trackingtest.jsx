import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./trackingtest.css";

export default function TrackingTest() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ballRef = useRef({ x: 200, y: 200, vx: 4, vy: 3, r: 30 });
  const scoreRef = useRef(0);

  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("trackingBest")) || 0
  );

  const cursorStyle = localStorage.getItem("cursorStyle") || "default";

  const maxScore = 500;
  const accuracy = Math.min(100, Math.round((score / maxScore) * 100));

  const saveScore = async (finalScore, finalAccuracy) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    await axios.post("http://localhost:3001/scores", {
      user_id: user.id,
      game_type: "tracking",
      score: finalScore,
      accuracy: finalAccuracy,
      reaction_time: null,
      duration: 10,
    });
  };

  const startGame = () => {
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(10);
    ballRef.current = { x: 200, y: 200, vx: 4, vy: 3, r: 30 };
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);

      const finalScore = scoreRef.current;
      const finalAccuracy = Math.min(
        100,
        Math.round((finalScore / maxScore) * 100)
      );

      if (finalScore > bestScore) {
        setBestScore(finalScore);
        localStorage.setItem("trackingBest", finalScore);
      }

      saveScore(finalScore, finalAccuracy);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    let animation;

    const drawCursor = () => {
      const mouse = mouseRef.current;

      if (cursorStyle === "dot") {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();
      }

      if (cursorStyle === "circle") {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 17, 0, Math.PI * 2);
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      if (cursorStyle === "crosshair") {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 18, mouse.y);
        ctx.lineTo(mouse.x + 18, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 18);
        ctx.lineTo(mouse.x, mouse.y + 18);
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isRunning) {
        if (cursorStyle !== "default") {
          drawCursor();
        }

        animation = requestAnimationFrame(draw);
        return;
      }

      const ball = ballRef.current;
      const mouse = mouseRef.current;

      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.vx *= -1;
      if (ball.y < ball.r || ball.y > canvas.height - ball.r) ball.vy *= -1;

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();

      const dist = Math.hypot(mouse.x - ball.x, mouse.y - ball.y);

      if (dist < ball.r) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      if (cursorStyle !== "default") {
        drawCursor();
      }

      animation = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animation);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isRunning, cursorStyle]);

  return (
    <div className="tracking-page">
      <button className="back-btn" onClick={() => navigate("/home")}>
        ← Back to Home
      </button>

      <h1>◎ Tracking Test</h1>
      <p>Keep your cursor on the moving target for as long as possible</p>

      <div className="tracking-stats">
        <div>Time Left<br /><span>{timeLeft}s</span></div>
        <div>Score<br /><span>{score}</span></div>
        <div>Accuracy<br /><span>{accuracy}%</span></div>
        <div>Best Score<br /><span>{bestScore || "---"}</span></div>
      </div>

      <div className="game-area">
        {!isRunning && timeLeft === 10 && (
          <button className="start-btn" onClick={startGame}>
            Start Test
          </button>
        )}

        {!isRunning && timeLeft === 0 && (
          <div className="result-box">
            <div className="trophy">🏆</div>
            <h2>Final Score: {score}</h2>
            <p>Accuracy: {accuracy}%</p>

            <button className="start-btn" onClick={startGame}>
              Play Again
            </button>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={900}
          height={420}
          className={cursorStyle !== "default" ? "hide-cursor" : ""}
        />
      </div>
    </div>
  );
}
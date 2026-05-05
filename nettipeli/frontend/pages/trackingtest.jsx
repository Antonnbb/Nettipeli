import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function TrackingTest() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ballRef = useRef({ x: 200, y: 200, vx: 4, vy: 3, r: 30 });

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsRunning(true);
  };

  const saveScore = async () => {
    await axios.post("http://localhost:3001/scores", {
      user_id: "4d938c6a-1150-4afe-953e-2427b12e04a1",
      game_type: "tracking",
      score: score,
      accuracy: null,
      reaction_time: null,
      duration: 10
    });
  };

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      saveScore();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    let animation;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      if (dist < ball.r && isRunning) {
        setScore((prev) => prev + 1);
      }

      animation = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animation);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isRunning]);

  return (
    <div>
      <h2>Tracking Test</h2>

      <button onClick={startGame} disabled={isRunning}>
        Start
      </button>

      <p>Aikaa jäljellä: {timeLeft}s</p>
      <p>Score: {score}</p>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}
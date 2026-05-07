import { useState } from "react";
import "./reactiontest.css";
import Navbar from "./navbar";

export default function ReactionTest() {
    const [state, setState] = useState("idle");
    const [startTime, setStartTime] = useState(0);
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("Click Anywhere to Start");

    const [timeoutId, setTimeoutId] = useState(null);

    const [best, setBest] = useState(null);
    const [average, setAverage] = useState(null);
    const [finished, setFinished] = useState(false);

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
        if (finished) return;

        if (state === "idle") {
            startRound();
            return;
        }

        if (state === "waiting") {
            clearTimeout(timeoutId);
            setMessage("Too soon!");

            setTimeout(() => {
                startRound();
            }, 800);

            return;
        }

        if (state === "ready") {
            const time = Date.now() - startTime;
            const newResults = [...results, time];

            setMessage(`${time} ms`);

            if (newResults.length === 5) {
                const avg =
                    newResults.reduce((a, b) => a + b, 0) / newResults.length;

                const bestTime = Math.min(...newResults);

                setAverage(Math.round(avg));
                setBest(bestTime);
                setFinished(true);

                setTimeout(async () => {
                    setMessage(`Average: ${Math.round(avg)} ms`);

                    // tallennus
                    const user = JSON.parse(localStorage.getItem("user"));
                    if (user) {
                        await fetch("http://localhost:3001/scores", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                user_id: user.id,
                                game_type: "reaction",
                                score: Math.round(avg),
                                reaction_time: Math.round(avg),
                            }),
                        });
                    }
                }, 800);

                setResults([]);
                setState("idle");
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
        setState("idle");
    };

    return (
        <>
            <Navbar />

            <div className="rt-page">
                <h2>⚡ Reaction Test</h2>
                <p>Click as quickly as you can when the screen turns green</p>

                <div className="rt-stats">
                    <div className="stat">
                        Best Time<br />{best ?? "---"}
                    </div>
                    <div className="stat">
                        Average<br />{average ?? "---"}
                    </div>
                </div>

                <div
                    className={`rt-box ${state}`}
                    onClick={handleClick}
                >
                    {message}
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
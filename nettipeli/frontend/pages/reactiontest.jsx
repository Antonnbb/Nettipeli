import { useState } from "react";
import axios from "axios";

export default function ReactionTest() {
    const [state, setState] = useState("idle"); // idle, waiting, ready
    const [startTime, setStartTime] = useState(0);
    const [result, setResult] = useState(null);

    const startGame = () => {
        setState("waiting");
        setResult(null);

        const delay = Math.random() * 2000 + 1000;

        setTimeout(() => {
            setState("ready");
            setStartTime(Date.now());
        }, delay);
    };

    const handleClick = async () => {
        if (state === "waiting") {
            setResult("Liian aikaisin!");
            setState("idle");
        }

        if (state === "ready") {
            const reactionTime = Date.now() - startTime;
            setResult(reactionTime);
            setState("idle");

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                alert("Kirjaudu ensin sisään!");
                return;
            }

            await axios.post("http://localhost:3001/scores", {
                user_id: user.id,
                game_type: "reaction",
                score: reactionTime,
                reaction_time: reactionTime
            });
        }
    };

    return (
        <div>
            <h2>Reaction Test</h2>

            <div
                onClick={handleClick}
                style={{
                    width: "300px",
                    height: "200px",
                    background:
                        state === "ready" ? "green" :
                            state === "waiting" ? "red" : "gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                }}
            >
                {state === "idle" && "Klikkaa aloittaaksesi"}
                {state === "waiting" && "Odota..."}
                {state === "ready" && "KLIKKAA!"}
            </div>

            <button onClick={startGame}>Start</button>

            {result && <p>Tulos: {result} ms</p>}
        </div>
    );
}
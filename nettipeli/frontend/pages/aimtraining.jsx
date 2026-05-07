import { useState } from "react";
import Navbar from "./navbar";

export default function AimTraining() {
    const [target, setTarget] = useState({ x: 200, y: 150 });
    const [score, setScore] = useState(0);

    const moveTarget = () => {
        setTarget({
            x: Math.random() * 500,
            y: Math.random() * 300,
        });
        setScore(score + 1);
    };

    return (
        <>
            <Navbar />

            <div>
                <h2>Aim Training</h2>
                <p>Score: {score}</p>

                <div
                    style={{
                        width: "600px",
                        height: "400px",
                        border: "2px solid black",
                        position: "relative",
                    }}
                >
                    <button
                        onClick={moveTarget}
                        style={{
                            position: "absolute",
                            left: target.x,
                            top: target.y,
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "red",
                            border: "none",
                            cursor: "pointer",
                        }}
                    />
                </div>
            </div>
        </>
    );
}
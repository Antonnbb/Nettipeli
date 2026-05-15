const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { supabase } = require("./database.js");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const password_hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from("profiles")
        .insert([{ username, password_hash }])
        .select("id, username")
        .single();

    if (error) return res.status(400).json({ message: error.message });

    res.json(data);
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const { data: user, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

    if (error || !user) {
        return res.status(401).json({ message: "Väärä käyttäjä" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
        return res.status(401).json({ message: "Väärä salasana" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        "SECRET_KEY",
        { expiresIn: "7d" }
    );

    res.json({
        token,
        user: {
            id: user.id,
            username: user.username,
        },
    });
});

app.post("/scores", async (req, res) => {
    const { user_id, game_type, score, accuracy, reaction_time, duration } =
        req.body;

    const { data, error } = await supabase
        .from("scores")
        .insert([{ user_id, game_type, score, accuracy, reaction_time, duration }])
        .select();

    if (error) return res.status(400).json({ message: error.message });

    res.json(data);
});

app.get("/scores/:game", async (req, res) => {
    const { game } = req.params;

    let orderBy = "score";
    if (game === "aim") orderBy = "score";
    if (game === "reaction") orderBy = "reaction_time";

    const { data, error } = await supabase
        .from("scores")
        .select("*, profiles(username)")
        .eq("game_type", game)
        .order(orderBy, { ascending: game === "reaction" }) // 👈 tärkeä
        .limit(10);

    if (error) return res.status(400).json({ message: error.message });

    res.json(data);
});

app.get("/profile-stats/:userId", async (req, res) => {
    const { userId } = req.params;

    const { data, error } = await supabase
        .from("scores")
        .select("*")
        .eq("user_id", userId);

    if (error) return res.status(400).json({ message: error.message });

    const reaction = data
        .filter((s) => s.game_type === "reaction")
        .sort((a, b) => a.reaction_time - b.reaction_time)[0];

    const aim = data
        .filter((s) => s.game_type === "aim")
        .sort((a, b) => b.accuracy - a.accuracy)[0];

    const tracking = data
        .filter((s) => s.game_type === "tracking")
        .sort((a, b) => b.score - a.score)[0];

    res.json({ reaction, aim, tracking });
});

app.put("/profile/username", async (req, res) => {
    const { user_id, username } = req.body;

    const { data, error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", user_id)
        .select("id, username")
        .single();

    if (error) return res.status(400).json({ message: error.message });

    res.json(data);
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
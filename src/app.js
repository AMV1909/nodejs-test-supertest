import express from "express";
import { v4 } from "uuid";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/tasks", (req, res) => {
    res.json([]);
});

app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) return res.sendStatus(400);

    res.json({
        id: v4(),
        title,
        description,
    });
});

export { app };
const express = require("express");

const app = express();

// Middleware
app.use(express.json());


//Routes
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});


// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

module.exports = app;
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const leads = [];

app.get("/", (req, res) => {
  res.send("Mompreneur Growth Engine Running 🚀");
});

app.get("/api/status", (req, res) => {
    res.json({
      status: "online",
      service: "Mompreneur Growth Engine",
      environment: "production",
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/submit", (req, res) => {
    ...
  });

  app.get("/api/leads", (req, res) => {
    ...
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
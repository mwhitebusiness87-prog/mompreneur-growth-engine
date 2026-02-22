const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mompreneur Growth Engine Running 🚀");
});

// 🔥 JSON API endpoint
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    service: "Mompreneur Growth Engine",
    environment: "production",
    timestamp: new Date().toISOString()
  });
});
// POST endpoint to accept data
app.post("/api/submit", (req, res) => {
  const data = req.body;

  res.json({
    message: "Data received successfully",
    received: data,
    timestamp: new Date().toISOString()
  });
});  // ← semicolon here
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
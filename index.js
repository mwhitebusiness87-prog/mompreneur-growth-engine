
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const leads = [];

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
 app.post("/api/submit", (req, res) => {
  const { name, goal, phase } = req.body;

  if (!name || !goal) {
    return res.status(400).json({
      error: "Name and goal are required"
    });
  }

  const newLead = {
    id: leads.length + 1,
    name,
    goal,
    phase: phase || "Not specified",
    createdAt: new Date().toISOString()
  };

  leads.push(newLead);

  res.status(201).json({
    message: "Lead captured successfully 🚀",
    lead: newLead
  });
});
app.get("/api/leads", (req, res) => {
  res.json({
    total: leads.length,
    leads
    });
  });
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
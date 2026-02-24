const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL.trim(),
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    goal TEXT NOT NULL,
    phase TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);
`).catch(console.error); 

console.log("DATABASE_URL VALUE:", process.env.DATABASE_URL);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/status", (req, res) => {
    res.json({
      status: "online",
      service: "Mompreneur Growth Engine",
      environment: "production",
      timestamp: new Date().toISOString()
    });
  });

app.post("/api/submit", async (req, res) => {
  const { name, goal, phase } = req.body;

  if (!name || !goal) {
    return res.status(400).json({
      error: "Name and goal are required"
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO leads (name, goal, phase)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, goal, phase || "Not specified"]
    );

    res.status(201).json({
      message: "Lead captured successfully 🚀",
      lead: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/leads", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leads ORDER BY created_at DESC"
    );

    res.json({
      total: result.rows.length,
      leads: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

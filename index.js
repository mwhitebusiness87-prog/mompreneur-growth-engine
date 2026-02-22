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
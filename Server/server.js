const express = require("express");
const path = require("path");
const db = require("./db");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve React static files (from `dist` folder)
app.use(express.static(path.join(__dirname, "../Client/dist")));

// API Route Example
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

app.get("/api/test-db", async (req, res) => {
  try {
    // Perform a simple query to test the connection
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ success: true, result: rows[0].result }); // Send the result as JSON
  } catch (error) {
    console.error("Database test failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Catch-all route to serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

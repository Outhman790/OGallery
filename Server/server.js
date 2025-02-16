const express = require("express");
const path = require("path");
const db = require("./db");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authRoutes = require("./Routes/authRoutes");
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/", authRoutes);

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

if (process.env.NODE_ENV === "production") {
  // Serve React static files (production only)
  app.use(express.static(path.join(__dirname, "../Client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/dist", "index.html"));
  });
} else {
  // Proxy React requests to the React development server (development only)
  app.use(
    createProxyMiddleware({
      target: "http://localhost:5173/", // React development server
      changeOrigin: true,
    })
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

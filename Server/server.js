import express, { json } from "express";
import cookieParser from "cookie-parser";
require("dotenv").config();

// Import the reusable database connection
import { query } from "./db";

// Create an Express app
const app = express();

// Middleware to parse JSON and cookies
app.use(json());
app.use(cookieParser());

// Test the database connection
app.get("/", (req, res) => {
  query("SELECT 1 + 1 AS result", (err, results) => {
    if (err) {
      console.error("Database test query failed:", err.message);
      return res.status(500).json({ message: "Database connection failed" });
    }
    res.json({
      message: "Database connected successfully",
      result: results[0].result,
    });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

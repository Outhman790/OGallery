const express = require("express");
const path = require("path");
const db = require("./config/db");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authRoutes = require("./Routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

app.use("/", authRoutes);

// Serve React static files (from `dist` folder)
app.use(express.static(path.join(__dirname, "../Client/dist")));

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
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

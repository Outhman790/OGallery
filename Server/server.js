const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const cookieParser = require('cookie-parser');
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true, // important for cookies (JWT in cookies)
  }),
);
// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

app.use('/', authRoutes);

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config(); // Load environment variables
const mysql = require('mysql2');

// Create and export a reusable database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections
  queueLimit: 0, // No limit on queued connection requests
});

// Export a promise-based connection for ease of use
const promisePool = pool.promise();

module.exports = promisePool;

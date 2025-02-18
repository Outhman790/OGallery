require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const signUpUser = async (req, res) => {
  try {
    console.log("DB Object:", db);

    const { firstName, lastName, email, password } = req.body;

    // Log the received data
    console.log("Request body:", req.body);

    if (!firstName || !lastName || !email || !password) {
      console.log("Validation error: Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const name = `${firstName} ${lastName}`.trim();

    console.log("Checking if email already exists...");
    const [existingUser] = await db.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      console.log("Duplicate email found:", email);
      return res.status(409).json({ message: "Email already in use" });
    }

    console.log("Hashing password...");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Inserting new user into database...");
    await db.query(
      "INSERT INTO user (Name, Email, Password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    console.log("User created successfully");
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Fetch user from database
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.Email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour expiration
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("⚠️ Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUpUser, loginUser };

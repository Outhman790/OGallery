const bcrypt = require("bcrypt");
const db = require("../db");

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
    console.error("Error during sign-up:", error); // Log the full error
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUpUser };

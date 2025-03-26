const express = require("express");
const { authenticateUser } = require("../authMiddleware");
const {
  signUpUser,
  loginUser,
  logout,
} = require("../Controllers/authController");
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/me", authenticateUser, (req, res) => {
  res.json({ user: req.user });
});
module.exports = router;

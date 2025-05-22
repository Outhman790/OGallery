const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../Middlewares/authMiddleware");
const {
  signUpUser,
  loginUser,
  logout,
} = require("../Controllers/authController");

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/me", authenticateUser, (req, res) => {
  res.json({ user: req.user });
});
module.exports = router;

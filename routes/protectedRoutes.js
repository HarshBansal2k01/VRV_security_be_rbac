const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// Admin route: Show all users and moderators
router.get("/admin", authMiddleware(["Admin"]), async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["User", "Moderator"] } });
    res.json({ message: "Welcome Admin!", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User route: Show logged-in user details
router.get("/user", authMiddleware(["User", "Admin"]), async (req, res) => {
  try {
    res.json({ message: "Welcome User!", user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Moderator route: Show all moderators and users
router.get("/moderator", authMiddleware(["Moderator"]), async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["User", "Moderator"] } });
    res.json({ message: "Welcome Moderator!", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

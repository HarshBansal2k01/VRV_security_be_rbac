const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/admin", authMiddleware(["Admin"]), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/user", authMiddleware(["User", "Admin"]), (req, res) => {
  res.json({ message: "Welcome User!" });
});
router.get("/moderator", authMiddleware(["User", "Moderator"]), (req, res) => {
  res.json({ message: "Welcome Moderator!" });
});

module.exports = router;

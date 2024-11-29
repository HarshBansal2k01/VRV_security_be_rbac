const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (!req.user || (roles.length && !roles.includes(req.user.role))) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid Token" });
    }
  };
};

module.exports = authMiddleware;

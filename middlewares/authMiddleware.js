const jwt = require("jsonwebtoken"); // Importing JWT library for token verification
const User = require("../models/User"); // Importing User model to fetch user data from the database

/**
 * Middleware for authentication and role-based access control (RBAC).
 * @param {Array} roles - List of roles that are allowed to access the route.
 *                        If empty, all authenticated users can access.
 * @returns Middleware function for Express.js
 */
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Extract the token from the 'Authorization' header (e.g., "Bearer <token>")
      const token = req.headers.authorization?.split(" ")[1];

      // If no token is provided, return an unauthorized error
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user's information to the request object by finding the user in the database
      req.user = await User.findById(decoded.id);

      // If user is not found or their role is not permitted, deny access
      if (!req.user || (roles.length && !roles.includes(req.user.role))) {
        return res.status(403).json({ message: "Access Denied" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      // If token is invalid or another error occurs, return an invalid token error
      res.status(401).json({ message: "Invalid Token" });
    }
  };
};

module.exports = authMiddleware;

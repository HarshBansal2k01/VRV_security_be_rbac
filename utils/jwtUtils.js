const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, secret, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { generateToken, verifyToken };

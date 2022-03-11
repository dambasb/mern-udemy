import jwt from "jsonwebtoken";
import secret from "../secret.js";

const auth = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msn: "No token, authorization denied" });
  }

  // Verify token

  try {
    const decoded = jwt.verify(token, secret.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: " Token is not valid" });
  }
};

export default auth;

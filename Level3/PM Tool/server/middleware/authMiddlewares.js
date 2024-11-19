import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to protect routes by checking the JWT token
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Authorization token is missing. Please log in.",
      });
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details from the database
    const user = await User.findById(decodedToken.userId).select("isAdmin email");

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found. Please log in again.",
      });
    }

    // Attach user details to the request object
    req.user = {
      email: user.email,
      isAdmin: user.isAdmin,
      userId: decodedToken.userId,
    };

    next(); // Continue to the next middleware
  } catch (error) {
    console.error("Authorization Error:", error);

    return res.status(401).json({
      status: false,
      message: "Authorization failed. Invalid or expired token.",
    });
  }
};

// Middleware to check if the authenticated user is an admin
const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      status: false,
      message: "Access denied. Admin privileges required.",
    });
  }
};

export { isAdminRoute, protectRoute };

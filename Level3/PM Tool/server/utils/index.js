// utils/db.js
import mongoose from "mongoose";

export const dbConnection = async () => {
  const retries = 5;
  let connected = false;

  for (let i = 0; i < retries && !connected; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log("DB connection established");
      connected = true;
    } catch (error) {
      console.error(`DB Connection Error (${i + 1}/${retries}):`, error);
      if (i < retries - 1) {
        console.log("Retrying DB connection...");
        await new Promise(resolve => setTimeout(resolve, 5000)); // Retry after 5 seconds
      }
    }
  }

  if (!connected) {
    console.error("DB Connection failed after multiple attempts.");
    process.exit(1); // Exit process if connection fails
  }
};
// utils/jwt.js
import jwt from "jsonwebtoken";

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "1d", // Default to 1 day if not specified
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure cookie in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // "none" for cross-site cookies in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
// utils/responseHandler.js
export const sendSuccess = (res, data, message = "Operation successful") => {
    res.status(200).json({
      status: true,
      message,
      data,
    });
  };
  
  export const sendError = (res, message = "An error occurred", statusCode = 400) => {
    res.status(statusCode).json({
      status: false,
      message,
    });
  };
  
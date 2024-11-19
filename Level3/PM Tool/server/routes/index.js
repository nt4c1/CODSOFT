import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

// Health check endpoint
router.get("/", (req, res) => {
  res.status(200).json({ status: true, message: "API is running" });
});

// Use versioning for better management
router.use("/v1/user", userRoutes);
router.use("/v1/task", taskRoutes);

// Example of future API versioning
// router.use("/v2/user", userV2Routes);

export default router;

import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewares.js";
import {
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
  getNotificationsList,
  getTeamList,
  loginUser,
  logoutUser,
  markNotificationRead,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// User Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Team Management - Admin Only
router.get("/team", protectRoute, isAdminRoute, getTeamList);

// User Profile and Notifications
router.put("/profile", protectRoute, updateUserProfile);
router.put("/change-password", protectRoute, changeUserPassword);
router.get("/notifications", protectRoute, getNotificationsList);
router.put("/notifications/read", protectRoute, markNotificationRead);

// Admin Routes for User Management
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;

import express from "express";
import {
  createTask,
  createSubTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Task creation and duplication
router.post("/create", protectRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);

// Task activity and statistics
router.post("/activity/:id", protectRoute, postTaskActivity);
router.get("/dashboard", protectRoute, dashboardStatistics);

// Task retrieval
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

// Task updates and modifications
router.put("/subtask/:id", protectRoute, isAdminRoute, createSubTask); // Changed endpoint name for consistency
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.put("/trash/:id", protectRoute, isAdminRoute, trashTask);

// Task deletion and restoration
router.delete("/delete-restore/:id?", protectRoute, isAdminRoute, deleteRestoreTask);

export default router;

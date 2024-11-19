import { sendError, sendSuccess } from "../utils/responseHandler.js";

export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, team, stage, date, priority, assets } = req.body;

    const priorityText = priority.toLowerCase();
    const stageText = stage.toLowerCase();

    const task = await Task.create({
      title,
      team,
      stage: stageText,
      date,
      priority: priorityText,
      assets,
      activities: [{
        type: "assigned",
        activity: generateTaskMessage(priorityText, date, team.length),
        by: userId,
      }],
    });

    await Notice.create({
      team,
      text: generateTaskMessage(priorityText, date, team.length),
      task: task._id,
    });

    return sendSuccess(res, { task }, "Task created successfully.");
  } catch (error) {
    console.error("Error creating task:", error);
    return sendError(res, "Failed to create task.");
  }
};

const generateTaskMessage = (priority, date, teamSize) => {
  let message = "New task has been assigned to you";
  if (teamSize > 1) message += ` and ${teamSize - 1} others.`;
  message += ` The task priority is set to ${priority} priority, and the date is ${new Date(date).toDateString()}.`;
  return message;
};
import mongoose from "mongoose";

export const duplicateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, "Invalid task ID.");
    }

    const task = await Task.findById(id).lean();
    if (!task) {
      return sendError(res, "Task not found.", 404);
    }

    const newTask = await Task.create({
      ...task,
      _id: undefined, // Exclude original ID
      title: `${task.title} - Duplicate`,
      date: new Date(), // Update to current date if necessary
    });

    await Notice.create({
      team: newTask.team,
      text: generateTaskMessage(newTask.priority, newTask.date, newTask.team.length),
      task: newTask._id,
    });

    return sendSuccess(res, { newTask }, "Task duplicated successfully.");
  } catch (error) {
    console.error("Error duplicating task:", error);
    return sendError(res, "Failed to duplicate task.");
  }
};
export const dashboardStatistics = async (req, res) => {
    try {
      const { userId, isAdmin } = req.user;
  
      const taskQuery = {
        isTrashed: false,
        ...(isAdmin ? {} : { team: { $in: [userId] } }),
      };
  
      const allTasks = await Task.find(taskQuery)
        .populate("team", "name role title email")
        .sort({ _id: -1 })
        .lean();
  
      const users = isAdmin
        ? await User.find({ isActive: true }).select("name title role isAdmin createdAt").sort({ _id: -1 }).limit(10).lean()
        : [];
  
      const groupedTasks = allTasks.reduce(
        (acc, task) => {
          acc.stages[task.stage] = (acc.stages[task.stage] || 0) + 1;
          acc.priority[task.priority] = (acc.priority[task.priority] || 0) + 1;
          return acc;
        },
        { stages: {}, priority: {} }
      );
  
      const summary = {
        totalTasks: allTasks.length,
        last10Task: allTasks.slice(0, 10),
        users,
        tasks: groupedTasks.stages,
        graphData: Object.entries(groupedTasks.priority).map(([name, total]) => ({ name, total })),
      };
  
      return sendSuccess(res, summary, "Dashboard statistics fetched successfully.");
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
      return sendError(res, "Failed to fetch dashboard statistics.");
    }
  };
  
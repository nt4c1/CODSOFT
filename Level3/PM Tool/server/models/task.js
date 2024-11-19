import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    date: { type: Date, default: Date.now },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: { type: String, maxlength: 500 },
        date: { type: Date, default: Date.now },
        by: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
    subTasks: [
      {
        title: { type: String, required: true, maxlength: 255 },
        date: { type: Date },
        tag: { type: String, maxlength: 50 },
      },
    ],
    assets: [{ type: String, maxlength: 255 }],
    team: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Add indexes for frequently queried fields
taskSchema.index({ stage: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ team: 1 });
taskSchema.index({ isTrashed: 1 });

// Static method to filter out trashed tasks
taskSchema.statics.findActiveTasks = function () {
  return this.find({ isTrashed: false });
};

// Method to update the stage of the task
taskSchema.methods.updateStage = function (newStage) {
  if (["todo", "in progress", "completed"].includes(newStage)) {
    this.stage = newStage;
    return this.save();
  }
  throw new Error("Invalid stage value");
};

// Method to add an activity to the task
taskSchema.methods.addActivity = function (activityType, activityText, userId) {
  this.activities.push({
    type: activityType,
    activity: activityText,
    by: userId,
  });
  return this.save();
};

// Soft delete method
taskSchema.methods.trashTask = function () {
  this.isTrashed = true;
  return this.save();
};

const Task = mongoose.model("Task", taskSchema);

export default Task;

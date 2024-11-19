import mongoose, { Schema } from "mongoose";

// Enum for notification types
const NotificationTypes = {
  ALERT: "alert",
  MESSAGE: "message",
};

const noticeSchema = new Schema(
  {
    team: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    text: { type: String, required: true, maxlength: 255 },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    notiType: {
      type: String,
      default: NotificationTypes.ALERT,
      enum: Object.values(NotificationTypes),
    },
    isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Add indexes for frequently queried fields
noticeSchema.index({ team: 1 });
noticeSchema.index({ isRead: 1 });

// Method to mark a notification as read for a user
noticeSchema.methods.markAsRead = function (userId) {
  if (!this.isRead.includes(userId)) {
    this.isRead.push(userId);
  }
  return this.save();
};

// Static method to find unread notifications for a user
noticeSchema.statics.findUnreadByUser = function (userId) {
  return this.find({ team: userId, isRead: { $nin: [userId] } }).populate("task", "title");
};

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
export { NotificationTypes };

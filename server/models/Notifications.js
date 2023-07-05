import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  notification: { type: String, required: true },
  postRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    default: null,
  },
  read: { type: Boolean, default: false },
  notificationDateTime: { type: Date, default: Date.now },
});

export const NotificationModel = mongoose.model(
  "notifications",
  NotificationSchema
);

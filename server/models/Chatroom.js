import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
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
  message: { type: String, required: true },
  messageDateTime: { type: Date, default: Date.now },
});

const ChatroomSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: [],
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
      default: [],
    },
  ],
});

export const ChatroomModel = mongoose.model("chatrooms", ChatroomSchema);
export const MessageModel = mongoose.model("messages", MessageSchema);

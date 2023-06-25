import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  message: { type: String, required: true },
  messageDateTime: { type: Date, default: Date.now },
});

const ChatroomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  messages: [{ type: MessageSchema }],
});

export const ChatroomModel = mongoose.model("chatrooms", ChatroomSchema);

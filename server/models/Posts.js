import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  comment: { type: String, required: true },
});

const PostSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  img: { type: String, required: true },
  caption: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  comments: [{ type: CommentSchema }],
  postDateTime: { type: Date, default: Date.now },
});

export const PostModel = mongoose.model("posts", PostSchema);

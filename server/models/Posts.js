import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  comment: { type: String, required: true },
  commentDateTime: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  img: { type: String, required: true },
  caption: { type: String, required: true },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    default: [],
  },
  comments: { type: [CommentSchema], default: [] },
  postDateTime: { type: Date, default: Date.now },
});

export const CommentModel = mongoose.model("comments", CommentSchema);
export const PostModel = mongoose.model("posts", PostSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  profilePicture: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg",
  },
  bio: { type: String, default: "" },
  follows: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    default: [],
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    default: [],
  },
  notifications: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "notifications" }],
    default: [],
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
    default: [],
  },
  rooms: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "chatrooms" }],
    default: [],
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
    default: [],
  },
});

export const UserModel = mongoose.model("users", UserSchema);

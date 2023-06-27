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
  follows: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  notifications: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "rooms" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
});

export const UserModel = mongoose.model("users", UserSchema);

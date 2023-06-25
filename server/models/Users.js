import mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  profilePicture: { type: String, default: "" },
  bio: { type: String, default: "" },
  follows: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  notifications: [{ type: String }],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "rooms" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
});

export const UserModel = mongoose.model("users", UserSchema);

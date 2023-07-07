import express from "express";
import { PostModel } from "../models/Posts.js";
import { UserModel } from "../models/Users.js";
import { CommentModel } from "../models/Posts.js";
import mongoose from "mongoose";
import { NotificationModel } from "../models/Notifications.js";
import { ChatroomModel } from "../models/Chatroom.js";

const router = express.Router();

// gets all chatrooms the user is in
router.get("/chatrooms/user/:uid", async (req, res) => {
  const { uid } = req.params;
  if (
    uid === undefined ||
    uid === "" ||
    !mongoose.Types.ObjectId.isValid(uid)
  ) {
    return res.status(400).json({ error: "uid is invalid" });
  }
  UserModel.findById(uid)
    .then((user) => {
      res.json(user.rooms);
    })
    .catch((err) =>
      res.status(400).json({ error: "user with uid does not exist" })
    );
});

// gets a list of users that shares a room with user
router.get("/dms/:uid", async (req, res) => {
  const { uid } = req.params;
  if (
    uid === undefined ||
    uid === "" ||
    !mongoose.Types.ObjectId.isValid(uid)
  ) {
    return res.status(400).json({ error: "uid is invalid" });
  }
  let userIds = [];
  await ChatroomModel.find({ users: uid }).then((chatrooms) => {
    chatrooms.forEach((chatroom) => {
      userIds = [...userIds, ...chatroom.users.filter((user) => user != uid)];
    });
  });

  UserModel.find({ _id: { $in: userIds } })
    .then((users) => res.json(users))
    .catch((err) =>
      res.status(400).json({ error: "failed to get list of dms" })
    );
});

// creates a new chatroom
router.post("/create/:uid1/:uid2", async (req, res) => {
  try {
    const { uid1, uid2 } = req.params;
    if (
      uid1 === undefined ||
      uid1 === "" ||
      !mongoose.Types.ObjectId.isValid(uid1)
    ) {
      return res.status(400).json({ error: "uid1 is invalid" });
    }
    if (
      uid2 === undefined ||
      uid2 === "" ||
      !mongoose.Types.ObjectId.isValid(uid2)
    ) {
      return res.status(400).json({ error: "uid2 is invalid" });
    }

    const user1 = await UserModel.findById(uid1);
    const user2 = await UserModel.findById(uid2);

    // compares uid1 and uid2 in lexicographical order, the bigger one goes in front
    const newChatroom = new ChatroomModel({
      users: [uid1, uid2].sort(),
    });

    const chatroom = await ChatroomModel.findOne({
      users: { $all: [uid1, uid2], $size: 2 },
    });
    if (chatroom) {
      return res.status(400).json({ error: "Chatroom already exists" });
    }

    await newChatroom.save();

    await UserModel.updateOne(
      { _id: uid1 },
      { $addToSet: { rooms: newChatroom._id } }
    );
    await UserModel.updateOne(
      { _id: uid2 },
      { $addToSet: { rooms: newChatroom._id } }
    );

    res.json(newChatroom);
  } catch (err) {
    res.json({ error: "Cannot create new chat" });
  }
});

// gets the room id of a dm between two users
router.get("/dm/:uid1/:uid2", async (req, res) => {
  const { uid1, uid2 } = req.params;
  if (
    uid1 === undefined ||
    uid1 === "" ||
    !mongoose.Types.ObjectId.isValid(uid1)
  ) {
    return res.status(400).json({ error: "uid1 is invalid" });
  }
  if (
    uid2 === undefined ||
    uid2 === "" ||
    !mongoose.Types.ObjectId.isValid(uid2)
  ) {
    return res.status(400).json({ error: "uid2 is invalid" });
  }
  ChatroomModel.findOne({
    users: { $all: [uid1, uid2], $size: 2 },
  })
    .then((chatroom) => res.json(chatroom))
    .catch((err) =>
      res.status(400).json({ error: "failed to get dm chatroom" })
    );
});

// gets the users in a room
router.get("/dm/room/users/:rid", async (req, res) => {
  const { rid } = req.params;
  if (
    rid === undefined ||
    rid === "" ||
    !mongoose.Types.ObjectId.isValid(rid)
  ) {
    return res.status(400).json({ error: "rid is invalid" });
  }
  ChatroomModel.findById(rid)
    .then((chatroom) => {
      UserModel.find({ _id: { $in: chatroom.users } })
        .then((users) => res.json(users))
        .catch((err) =>
          res.status(400).json({ error: "failed to get users in room" })
        );
    })
    .catch((err) => res.status(400).json({ error: "room does not exist" }));
});

// remember to export the router
export { router as chatRouter };

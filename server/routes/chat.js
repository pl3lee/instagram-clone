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

  const user1 = await UserModel.findById(uid1).catch((err) => {
    res.status(400).json({ error: "uid1 does not exist" });
    return;
  });
  const user2 = await UserModel.findById(uid2).catch((err) => {
    res.status(400).json({ error: "uid2 does not exist" });
    return;
  });

  // compares uid1 and uid2 in lexicographical order, the bigger one goes in front
  const newChatroom = new ChatroomModel({
    users: [uid1, uid2].sort(),
  });

  await newChatroom.save();

  UserModel.updateOne(
    { _id: uid1 },
    { $addToSet: { rooms: newChatroom._id } }
  ).catch((err) => {
    res.status(500).json({ error: "failed to add chatroom to user1" });
    return;
  });
  UserModel.updateOne({ _id: uid2 }, { $addToSet: { rooms: newChatroom._id } })
    .then((response) => {
      res.json(newChatroom);
    })
    .catch((err) => {
      res.status(500).json({ error: "failed to add chatroom to user2" });
      return;
    });
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

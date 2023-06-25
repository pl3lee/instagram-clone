// users route encompass everything relating to logging in and registering
import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// registers a new user
router.post("/register", async (req, res) => {
  const { firebaseId } = req.body;

  const newUser = new UserModel({
    firebaseId: firebaseId,
    username: firebaseId,
  });
  // add to mongoDB
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User registration failed" });
    });

  // res.json({ message: "User registration successful" });
});

// follows another user
router.patch("/follow", async (req, res) => {
  const { uid, followId } = req.body;
  UserModel.findById(uid)
    .then((user) => {
      if (user.follows.includes(followId)) {
        res.status(500).json({ message: "User already followed" });
      } else {
        user.follows.push(followId);
        user.save();
        res.json({ message: "User followed" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User follow failed" });
    });
});

// unfollows another user
router.patch("/unfollow", async (req, res) => {
  const { uid, followId } = req.body;
  UserModel.findById(uid)
    .then((user) => {
      if (user.follows.includes(followId)) {
        user.follows.pull(followId);
        user.save();
        res.json({ message: "User unfollowed" });
      } else {
        res.status(500).json({ message: "User already not followed" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User unfollow failed" });
    });
});

// gets the ids of the accounts that the user follows
router.get("/following/:uid/id", async (req, res) => {
  const { uid } = req.params;
  UserModel.findById(uid).then((user) => {
    res.json(user.follows);
  });
});

// gets the ids of all the accounts that follow the user

// remember to export the router
export { router as userRouter };

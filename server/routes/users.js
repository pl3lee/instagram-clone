// users route encompass everything relating to logging in and registering
import express from "express";
import { UserModel } from "../models/Users.js";
import { NotificationModel } from "../models/Notifications.js";
import mongoose from "mongoose";
import { auth } from "../firebase/firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

// registers a new user
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((createdUser) => {
      const newUser = new UserModel({
        firebaseId: createdUser.user.uid,
        username: username,
      });
      // add to mongoDB
      newUser
        .save()
        .then((user) => {
          const id = user._id;
          const token = jwt.sign({ id }, process.env.JWTSECRET);
          res.json({ user: user, token });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "User registration failed" });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ messsage: "Error with registering with firebase auth" });
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      UserModel.findOne({ firebaseId: user.user.uid })
        .then((mongoUser) => {
          const id = mongoUser._id;
          const token = jwt.sign({ id }, process.env.JWTSECRET);
          res.json({ user: mongoUser, token });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "User login failed" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User login failed" });
    });
});

router.post("/logout", async (req, res) => {
  signOut(auth)
    .then(() => {
      res.json({ message: "User logged out" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User logout failed" });
    });
});
// follows another user
router.patch("/follow", verifyJWT, async (req, res) => {
  const { uid, followId } = req.body;

  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(followId) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  if (uid == followId) {
    res.status(500).json({ message: "User cannot follow themselves" });
    return;
  }
  const newNotification = new NotificationModel({
    senderId: uid,
    receiverId: followId,
    notification: `follow`,
  });
  UserModel.updateOne({ _id: uid }, { $addToSet: { follows: followId } }).catch(
    (err) => {
      res.status(500).json({ message: "User follow failed" });
    }
  );
  UserModel.updateOne({ _id: followId }, { $addToSet: { followers: uid } })
    .then(() => {
      newNotification.save();
      res.json({ message: "User followed" });
    })
    .catch((err) => {
      res.status(500).json({ message: "User follow failed" });
    });
});

// unfollows another user
router.patch("/unfollow", verifyJWT, async (req, res) => {
  const { uid, followId } = req.body;
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(followId) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  if (uid == followId) {
    res.status(500).json({ message: "User cannot follow themselves" });
    return;
  }
  UserModel.updateOne({ _id: uid }, { $pull: { follows: followId } }).catch(
    (err) => {
      res.status(500).json({ message: "User unfollow failed" });
    }
  );
  UserModel.updateOne({ _id: followId }, { $pull: { followers: uid } })
    .then(() => {
      res.json({ message: "User unfollowed" });
    })
    .catch((err) => {
      res.status(500).json({ message: "User unfollow failed" });
    });
});

// gets the ids of the accounts that the user follows
router.get("/following/:uid/id", verifyJWT, async (req, res) => {
  const { uid } = req.params;
  if (uid === undefined) {
    res.json({ message: "User id not provided" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  UserModel.findById(uid)
    .then((user) => {
      res.json(user.follows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Following retrieval failed" });
    });
});

// gets the ids of all the accounts that follow the user
router.get("/followers/:uid/id", verifyJWT, async (req, res) => {
  const { uid } = req.params;
  if (uid === undefined) {
    res.json({ message: "User id not provided" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  UserModel.find({ follows: uid })
    .then((users) => {
      res.json(users.map((user) => user._id));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Followers retrieval failed" });
    });
});

// get the user's information by mongodb id
router.get("/user/:uid", verifyJWT, async (req, res) => {
  const { uid } = req.params;
  if (uid === undefined) {
    res.json({ message: "User id not provided" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  UserModel.findById(uid)
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User retrieval failed" });
    });
});

// get the user's information by firebase id
router.get("/fb/:firebaseId", verifyJWT, async (req, res) => {
  const { firebaseId } = req.params;
  UserModel.findOne({ firebaseId: firebaseId })
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User retrieval failed" });
    });
});

router.patch("/update/:uid", verifyJWT, async (req, res) => {
  const { uid } = req.params;
  if (uid === undefined) {
    res.status(400).json({ message: "User id not provided" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  let { username, bio, profilePicture } = req.body;

  // Create an object with the fields to update
  let updateFields = { username, bio, profilePicture };

  // Remove any fields that are empty strings
  Object.keys(updateFields).forEach((key) => {
    if (updateFields[key] === "") {
      delete updateFields[key];
    }
  });

  UserModel.updateOne({ _id: uid }, { $set: updateFields })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User update failed" });
    });
});

// checks if a user with username exists
router.get("/exists/:username", async (req, res) => {
  const { username } = req.params;
  UserModel.find({ username: username })
    .then((users) => {
      if (users.length > 0) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    })
    .catch((err) => res.status(500).json({ message: "User fetch failed" }));
});

router.get("/search/:query", verifyJWT, async (req, res) => {
  const { query } = req.params;
  UserModel.find({ username: { $regex: query, $options: "i" } })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(500).json({ message: "User fetch failed" }));
});

// gets all notifications of a user
router.get("/notifications/notification/:uid", verifyJWT, async (req, res) => {
  const { uid } = req.params;
  if (uid === undefined) {
    res.status(400).json({ message: "Missing user id" });
    return;
  }
  if (uid === "") {
    res.status(400).json({ message: "Missing user id" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  UserModel.findById(uid).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "User does not exist" });
  });

  NotificationModel.find({ receiverId: req.params.uid })
    .sort({ notificationDateTime: -1 })
    .then((notifications) => {
      res.json(notifications);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get notifications" });
    });
});

// sets all notifications of a user read true
router.patch("/notifications/read/:uid", verifyJWT, async (req, res) => {
  const { uid } = req.params;
  if (uid === undefined) {
    res.status(400).json({ message: "Missing user id" });
    return;
  }
  if (uid === "") {
    res.status(400).json({ message: "Missing user id" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  UserModel.findById(uid).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "User does not exist" });
  });

  NotificationModel.updateMany({ receiverId: uid }, { read: true })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to update notifications" });
    });
});

// remember to export the router
export { router as userRouter };

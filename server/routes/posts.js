import express from "express";
import { PostModel } from "../models/Posts.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// gets all posts, regardless of who posted it
router.get("/", async (req, res) => {
  PostModel.find()
    .then((posts) => res.json(posts))
    .catch((error) => res.json(error));
});

// creates a post for a user
router.post("/create", async (req, res) => {
  const { firebaseId, img, caption } = req.body;
  UserModel.findOne({ firebaseId: firebaseId })
    .then((user) => {
      const newPost = new PostModel({
        img: img,
        caption: caption,
        uid: user._id,
      });
      newPost.save();
      user.posts.push(newPost._id);
      user.save();
      res.json(newPost);
    })
    .catch((err) => console.log(err));
});

// gets all posts from following users, including the user himself
router.get("/following/:uid", async (req, res) => {
  const { uid } = req.params;
  UserModel.findById(uid).then((user) => {
    const followingUsers = [...user.follows, user._id];
    PostModel.find({ uid: { $in: followingUsers } }).then((posts) =>
      res.json(posts)
    );
  });
});

// remember to export the router
export { router as postsRouter };

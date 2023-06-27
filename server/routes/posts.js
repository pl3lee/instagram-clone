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
  UserModel.findById(uid)
    .then((user) => {
      const followingUsers = [...user.follows, user._id];
      PostModel.find({ uid: { $in: followingUsers } })
        .then((posts) => res.json(posts))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// likes a post
router.patch("/like/:uid/:postId", async (req, res) => {
  const { uid, postId } = req.params;

  await UserModel.findById(uid).catch((err) =>
    res.status(404).json({ message: "User not found" })
  );
  await PostModel.findById(postId).catch((err) =>
    res.status(404).json({ message: "Post not found" })
  );

  UserModel.updateOne({ _id: uid }, { $addToSet: { likes: postId } }).catch(
    (err) => {
      console.log(err);
      res.status(500).json({ message: "Post like failed" });
    }
  );
  PostModel.updateOne({ _id: postId }, { $addToSet: { likes: uid } })
    .then(() => {
      res.json({ message: "Post liked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Post like failed" });
    });
});

// unlikes a post
router.patch("/unlike/:uid/:postId", async (req, res) => {
  const { uid, postId } = req.params;

  await UserModel.findById(uid).catch((err) =>
    res.status(404).json({ message: "User not found" })
  );
  await PostModel.findById(postId).catch((err) =>
    res.status(404).json({ message: "Post not found" })
  );

  UserModel.updateOne({ _id: uid }, { $pull: { likes: postId } }).catch(
    (err) => {
      console.log(err);
      res.status(500).json({ message: "Post unlike failed" });
    }
  );
  PostModel.updateOne({ _id: postId }, { $pull: { likes: uid } })
    .then(() => {
      res.json({ message: "Post unliked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Post unlike failed" });
    });
});

// gets all the users that likes a post
router.get("/likes/:postId", async (req, res) => {
  const { postId } = req.params;
  const users = [];
  PostModel.findById(postId)
    .then((post) => {
      post.likes.map((uid) => {
        UserModel.findById(uid)
          .then((user) => {
            users.push(user);
            if (users.length === post.likes.length) {
              res.json(users);
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Failed to get user likes" });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to find post" });
    });
});

// remember to export the router
export { router as postsRouter };

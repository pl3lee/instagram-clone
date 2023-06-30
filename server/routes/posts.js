import express from "express";
import { PostModel } from "../models/Posts.js";
import { UserModel } from "../models/Users.js";
import { CommentModel } from "../models/Posts.js";
import mongoose from "mongoose";

const router = express.Router();

// gets all posts, regardless of who posted it
router.get("/", async (req, res) => {
  PostModel.find()
    .then((posts) => res.status(400).json(posts))
    .catch((error) => res.status(400).json(error));
});

// gets all post from a user
router.get("/user/:uid", async (req, res) => {
  const { uid } = req.params;
  if (uid === undefined) {
    res.status(400).json({ message: "Missing user id" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  UserModel.findById(uid)
    .then((user) => {
      PostModel.find({ uid: uid })
        .then((posts) => res.json(posts))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

// gets information about a post
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  if (postId === undefined) {
    res.status(400).json({ message: "Missing post id" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(postId) === false) {
    res.status(400).json({ message: "Invalid post id" });
    return;
  }
  PostModel.findById(postId)
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json(err));
});
// creates a post for a user
router.post("/create/:uid", async (req, res) => {
  const { uid } = req.params;
  const { img, caption } = req.body;
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
  }

  UserModel.findById(uid)
    .then((user) => {
      const newPost = new PostModel({
        img: img,
        caption: caption,
        uid: uid,
      });
      newPost.save();
      UserModel.updateOne(
        { _id: uid },
        { $push: { posts: newPost._id } }
      ).catch((err) => {
        console.log(err);
      });
      res.json({ message: "New Post created", newPost });
    })
    .catch((err) => {
      res.json({ message: "User not found" });
    });
});

// gets all posts from following users, including the user himself
router.get("/following/:uid", async (req, res) => {
  const { uid } = req.params;
  if (uid === undefined) {
    res.status(400).json({ message: "Missing user id" });
    return;
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  UserModel.findById(uid)
    .then((user) => {
      const followingUsers = [...user.follows, user._id];
      PostModel.find({ uid: { $in: followingUsers } })
        .then((posts) => res.json(posts))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

// likes a post
router.patch("/like/:uid/:postId", async (req, res) => {
  const { uid, postId } = req.params;
  if (uid === undefined || postId === undefined) {
    res.status(400).json({ message: "Missing user id or post id" });
  }
  if (uid === "" || postId === "") {
    res.status(400).json({ message: "Missing user id or post id" });
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
  }
  if (mongoose.Types.ObjectId.isValid(postId) === false) {
    res.status(400).json({ message: "Invalid post id" });
  }

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
  if (uid === undefined || postId === undefined) {
    res.status(400).json({ message: "Missing user id or post id" });
  }
  if (uid === "" || postId === "") {
    res.status(400).json({ message: "Missing user id or post id" });
  }
  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
  }
  if (mongoose.Types.ObjectId.isValid(postId) === false) {
    res.status(400).json({ message: "Invalid post id" });
  }

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
  if (postId === undefined) {
    res.status(400).json({ message: "Missing user id or post id" });
  }
  if (postId === "") {
    res.status(400).json({ message: "Missing user id or post id" });
  }
  if (mongoose.Types.ObjectId.isValid(postId) === false) {
    res.status(400).json({ message: "Invalid post id" });
  }
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

// adds a comment to a post
router.patch("/comment/:uid/:postId", async (req, res) => {
  const { uid, postId } = req.params;
  const { comment } = req.body;
  if (uid === undefined || postId === undefined) {
    res.status(400).json({ message: "Missing user id or post id" });
  }

  if (mongoose.Types.ObjectId.isValid(uid) === false) {
    res.status(400).json({ message: "Invalid user id" });
  }
  if (mongoose.Types.ObjectId.isValid(postId) === false) {
    res.status(400).json({ message: "Invalid post id" });
  }
  if (comment === "") {
    res.status(400).json({ message: "Comment cannot be empty" });
  }

  await UserModel.findById(uid).catch((err) =>
    res.status(404).json({ message: "User not found" })
  );
  await PostModel.findById(postId).catch((err) =>
    res.status(404).json({ message: "Post not found" })
  );

  const newComment = new CommentModel({
    uid: uid,
    comment: comment,
  });
  PostModel.updateOne({ _id: postId }, { $addToSet: { comments: newComment } })
    .then(() => res.json({ message: "Comment added" }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to add comment" });
    });
});

// gets all the comments of a post
router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  if (postId === undefined) {
    res.status(400).json({ message: "Missing user id or post id" });
  }
  if (mongoose.Types.ObjectId.isValid(postId) === false) {
    res.status(400).json({ message: "Invalid post id" });
  }
  PostModel.findById(postId)
    .then((post) => {
      res.json(post.comments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get comments" });
    });
});

// remember to export the router
export { router as postsRouter };

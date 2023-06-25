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
      res.json(newPost);
    })
    .catch((err) => console.log(err));
});

router.get("/user", async (req, res) => {
  return res.json({ message: "user" });
});
// remember to export the router
export { router as postsRouter };

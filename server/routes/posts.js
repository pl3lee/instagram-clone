import express from "express";
import { PostModel } from "../models/Posts.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// gets all posts, regardless of who posted it
router.get("/", async (req, res) => {
  try {
    // the object inside .find are find conditions. Since we want to find all recipes, we pass in an empty object
    const response = await PostModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

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

// remember to export the router
export { router as postsRouter };

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
  UserModel.find({ firebaseId: firebaseId }, async (err, docs) => {
    if (err) {
      res.status(500).json({ message: "User not found" });
    } else {
      const newPost = new PostModel({
        uid: docs[0]._id,
        img: img,
        caption: caption,
      });
      try {
        await newPost.save();
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Post creation failed" });
      }
      res.json({ message: "Post creation successful" });
    }
  });
});

// remember to export the router
export { router as postsRouter };

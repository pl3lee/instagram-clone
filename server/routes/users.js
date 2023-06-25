// users route encompass everything relating to logging in and registering
import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firebaseId } = req.body;

  const newUser = new UserModel({
    firebaseId: firebaseId,
    username: firebaseId,
  });
  // add to mongoDB
  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User registration failed" });
  }

  res.json({ message: "User registration successful" });
});

// remember to export the router
export { router as userRouter };

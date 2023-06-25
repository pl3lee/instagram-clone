import dotenv from "dotenv";
import express from "express";
// cors allow us to setup rules for communication between the client and the server
import cors from "cors";
// database management system
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { postsRouter } from "./routes/posts.js";

dotenv.config();
// generate version of our API
const app = express();

// whenever we get data from frontend, it will convert it to json
// these are called middlewares
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postsRouter);

// put this after middlewares are applied and before listen
// process.env is a available globally
mongoose.connect(
  "mongodb+srv://billy:oDPNQInPBEE9oNDb@instagram.gza37jc.mongodb.net/instagram?retryWrites=true&w=majority"
);

// for heroku
app.listen(process.env.PORT || 3001, () =>
  console.log("Server is running on port 3001")
);

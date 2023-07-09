import dotenv from "dotenv";
import express from "express";
// cors allow us to setup rules for communication between the client and the server
import cors from "cors";
// database management system
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { postsRouter } from "./routes/posts.js";
import { chatRouter } from "./routes/chat.js";
import { auth } from "./firebase/firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import axios from "axios";

dotenv.config();
// generate version of our API
const app = express();
export const server = new Server(app);

// whenever we get data from frontend, it will convert it to json
// these are called middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/chat", chatRouter);

// put this after middlewares are applied and before listen
// process.env is a available globally
mongoose.connect(
  "mongodb+srv://billy:oDPNQInPBEE9oNDb@instagram.gza37jc.mongodb.net/instagram?retryWrites=true&w=majority"
);

// for heroku
server.listen(process.env.PORT || 3001, () =>
  console.log("Server is running on port 3001")
);

export const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    console.log("here is the data the user sent:", data);
    axios
      .post(
        `http://localhost:3001/chat/send/${data.chatroom}/${data.senderId}`,
        {
          message: data.message,
        }
      )
      .then((newMessage) => {
        socket.emit("receive_message", newMessage.data);
      })
      .catch((err) => console.log(err));
  });
  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data.chatroom);
  });
});

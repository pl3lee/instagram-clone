import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { postsRouter } from "./routes/posts.js";
import { chatRouter } from "./routes/chat.js";
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import axios from "axios";
import { auth } from "./firebase/firebase-config.js";

dotenv.config();
export const app = express();
export const server = new Server(app);

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/chat", chatRouter);

mongoose.connect(process.env.MONGODB_URI);

server.listen(process.env.PORT || 3001, () =>
  console.log("Server is running on port 3001")
);

export const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data, cb) => {
    axios
      .post(
        `${process.env.BACKENDURL}/chat/send/${data.chatroom}/${data.senderId}`,
        {
          message: data.message,
        },
        {
          headers: {
            "x-access-token": data.token,
          },
        }
      )
      .then((newMessage) => {
        socket.to(data.chatroom).emit("receive_message", newMessage.data);
        cb(newMessage.data);
      })
      .catch((err) => console.log(err));
  });

  socket.on("join_room", (_id) => {
    socket.join(_id);
  });
});

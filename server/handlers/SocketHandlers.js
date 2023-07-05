import { io } from "../index.js";

io.use((socket, next) => {
  const onevent = socket.onevent;
  socket.onevent = function (packet) {
    console.log(`Received event: ${packet.data[0]}`);
    onevent.call(this, packet);
  };
  next();
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

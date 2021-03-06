require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT || "http://localhost:3000",
    methods: ["GET, POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`USER CONNECTED ${socket.id} !!!`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`USER ${socket.id} JOINED THE ROOM ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`USER DISCONNECTED ${socket.id} :p `);
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("server is running!");
});

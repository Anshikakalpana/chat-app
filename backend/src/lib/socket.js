import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});


const userSocketMap= {};
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if(userId)
    userSocketMap[userId] = socket.id;
    io.emit("online-users", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected:", socket.id);
    delete userSocketMap[userId];
  });
});

export { io, app, server };

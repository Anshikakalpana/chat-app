
import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = http.createServer(app);

//  Define userSocketMap before using it
const userSocketMap = {};

//  Proper CORS setup
const io = new Server(server, {
  cors: {
    origin: process.env.URL || "http://localhost:5173",
    credentials: true,
  },
});

// Connection handling
io.on("connection", (socket) => {
  console.log(" A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("online-users", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log(" A user disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("online-users", Object.keys(userSocketMap));
  });
});

//  Export helper and server
export function getReceiverSocketid(userId) {
  return userSocketMap[userId];
}

export { io, app, server };

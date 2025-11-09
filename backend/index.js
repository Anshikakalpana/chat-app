import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userroutes } from "./src/routes/UserAuthRoute.js";
import { messageroutes } from "./src/routes/messageRoutes.js";
import { app, server } from "./src/lib/socket.js";

dotenv.config();


const allowedOrigins = [
  "http://localhost:5173",           // for local dev
  "https://f-flux.onrender.com"      // your production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", userroutes);
app.use("/api/messages", messageroutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

// ✅ MongoDB Connection + Server Start
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully");

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();

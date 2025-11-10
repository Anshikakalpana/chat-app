import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userroutes } from "./src/routes/UserAuthRoute.js";
import { messageroutes } from "./src/routes/messageRoutes.js";
import { app, server } from "./src/lib/socket.js";

dotenv.config();


app.set('trust proxy', 1); // required when behind Render / proxy

const allowedOrigins = [
  "http://localhost:5173",
  process.env.URL || "https://f-flux.onrender.com"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow curl/postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed"));
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
};

app.use(cors(corsOptions));


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


app.use("/api/auth", userroutes);
app.use("/api/messages", messageroutes);


app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});


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

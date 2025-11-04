import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { userroutes } from "./src/routes/UserAuthRoute.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", userroutes);

// ✅ Basic test route (should always be before listen)
app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

// ✅ Start server AFTER DB connection
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database connected successfully");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

startServer();

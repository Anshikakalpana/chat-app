import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import message from "../controllers/messageContacts.js";

const router = express.Router();

router.get("/getcontacts", authMiddleware, message.getContacts);
router.get("/:id", authMiddleware, message.getMessages);
router.post("/:id", authMiddleware, message.sendMessage);

export const messageroutes = router;

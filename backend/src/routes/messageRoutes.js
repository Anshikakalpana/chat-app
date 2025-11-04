import express from "express"
import authMiddleware from "../middlewares/auth";
import message from "../controllers/messageContacts";

const router = express.router();
router.post('/getcontact' ,authMiddleware , message.getContacts)
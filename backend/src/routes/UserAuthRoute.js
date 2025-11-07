import express from "express";
import { userController } from "../controllers/users.js";
import { authMiddleware, verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login/email", userController.loginUserByEmail);
router.post("/login/number", userController.loginUserByNumber);
router.post("/refresh", userController.refreshToken);
router.post("/logout", userController.logout);
router.post("/logout/all", userController.allDeviceLogout);
router.put("/update", authMiddleware, userController.updateProfile);
router.get("/checkuser", verifyUser, userController.checkUser);

export const userroutes = router;

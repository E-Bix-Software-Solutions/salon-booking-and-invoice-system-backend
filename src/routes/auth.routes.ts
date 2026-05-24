import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", protect, logoutUser);


export default authRouter;
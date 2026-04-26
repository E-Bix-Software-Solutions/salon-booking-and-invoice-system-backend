import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

authRouter.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

export default authRouter;
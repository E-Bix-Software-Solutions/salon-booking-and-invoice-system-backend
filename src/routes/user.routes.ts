import express from "express"
import { protect } from "../middleware/auth.middleware.ts";
import { getUser, updateUser, updateUserProfile } from "../controllers/user.controller.ts";

const userRouter = express.Router();

userRouter.get("/me", protect, getUser);
userRouter.patch("/update-profile-picture", protect, updateUserProfile);
userRouter.put("/update-profile", protect, updateUser)

export default userRouter;
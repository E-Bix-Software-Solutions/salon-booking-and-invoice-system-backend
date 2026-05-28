import express from "express"
import { protect } from "../middleware/auth.middleware.ts";
import { getUser, updateUser, updateUserProfile, getSecuritySettings, updatePassword } from "../controllers/user.controller.ts";

const userRouter = express.Router();

userRouter.get("/me", protect, getUser);
userRouter.patch("/update-profile-picture", protect, updateUserProfile);
userRouter.put("/update-profile", protect, updateUser)
userRouter.get("/security", protect, getSecuritySettings);
userRouter.put("/change-password", protect, updatePassword);

export default userRouter;
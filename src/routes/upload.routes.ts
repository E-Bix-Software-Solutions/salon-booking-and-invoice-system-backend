import express from "express";
import { upload } from "../middleware/upload.middleware.ts";
import { uploadSingleImage } from "../controllers/upload.controller.ts";

const uploadRouter = express.Router();

uploadRouter.post("/image", upload.single("image"), uploadSingleImage);

export default uploadRouter;
import multer from "multer";
import logger from "../config/logger.ts";
import { Readable } from "stream";
import { cloudinary } from "../config/cloudinary.ts";
import type { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    logger.error("Only image files are allowed");
    cb(new Error("Only image files are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export const uploadBufferToCloudinary = (
  buffer: Buffer,
  folder: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

export const handleImageUpload = (folder: string) => {
  return [
    upload.single("image"),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        if (req.file) {
          logger.info(`Uploading image to Cloudinary folder: ${folder}...`);
          const result = await uploadBufferToCloudinary(req.file.buffer, folder);
          req.body.imageUrl = result.secure_url;
          logger.info(`Image uploaded successfully: ${result.secure_url}`);
        }
        next();
      } catch (error) {
        logger.error(`Image upload middleware error: ${error}`);
        next(error);
      }
    }
  ];
};
import type { Request, Response } from "express";
import { Readable } from "stream";
import { cloudinary } from "../config/cloudinary.ts";
import logger from "../config/logger.ts";

const uploadBufferToCloudinary = (
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

export const uploadSingleImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
      return;
    }

    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      "salon/staff"
    );

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error: any) {
    logger.error(error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};
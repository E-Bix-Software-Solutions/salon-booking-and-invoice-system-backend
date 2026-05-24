import mongoose from "mongoose";
import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import logger from "../config/logger.ts";
import { cloudinary } from "../config/cloudinary.ts";
import type { UserType } from "../types/user.ts";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });
      return;
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error,
    });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  let session: mongoose.ClientSession | null = null;
  let transactionCommitted = false;

  const { imageUrl, publicId } = req.body;

  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });
      return;
    }

    if (!imageUrl || !publicId) {
      res.status(400).json({
        success: false,
        message: "Image URL and public ID are required",
      });
      return;
    }

    session = await mongoose.startSession();
    session.startTransaction();

    const currentUser = await User.findById(req.user.id).session(session);

    if (!currentUser) {
      await session.abortTransaction();

      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const oldImagePublicId = currentUser.publicId;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        imageUrl,
        publicId,
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    ).select("-password");

    if (!updatedUser) {
      await session.abortTransaction();

      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    await session.commitTransaction();
    transactionCommitted = true;

    // Delete old Cloudinary image only after DB update success
    if (oldImagePublicId && oldImagePublicId !== publicId) {
      await cloudinary.uploader.destroy(oldImagePublicId);
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    if (session && !transactionCommitted) {
      await session.abortTransaction();
    }

    // If DB update failed, delete newly uploaded Cloudinary image
    if (!transactionCommitted && publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    logger.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response

) => {
  const body: UserType = req.body;
  User.findByIdAndUpdate(req.user?.id, body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: error.message,
      });
    });
}
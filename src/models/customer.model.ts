import mongoose from "mongoose";
import type { CustomerType } from "../types/customer.ts";

const CustomerSchema = new mongoose.Schema<CustomerType>({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "{VALUE} is not a valid gender",
    },
  },
  dateOfBirth: {
    type: Date,
  },
  address: {
    type: String,
    trim: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  loyaltyLevel: {
    type: String,
    default: "Bronze",
    enum: {
      values: ["Bronze", "Silver", "Gold", "Platinum"],
      message: "{VALUE} is not a valid loyalty level",
    },
  },
  status: {
    type: String,
    default: "Active",
    enum: {
      values: ["Active", "Inactive"],
      message: "{VALUE} is not a valid status",
    },
  },
  preferredService: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [false, "Image is  not required"],
  },
});

const Customer = mongoose.model<CustomerType>("customer", CustomerSchema);
export default Customer;

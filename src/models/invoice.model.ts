import mongoose, { Schema, Document } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IInvoice extends Document {
  invoiceNo: string;
  customerName: string;
  service: string;
  amount: number;         // Converted to Number for better DB operations
  invoiceDate: Date;      // Converted to Date
  dueDate: Date;          // Converted to Date
  paymentMethod: string;
  paymentStatus: string;
  notes?: string;         // Optional, since notes are often blank
}

// 2. Define the Mongoose Schema matching your type.
const InvoiceSchema: Schema = new Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,       // Ensures invoice numbers aren't duplicated
      trim: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,       // Using Number instead of String
      required: true,
    },
    invoiceDate: {
      type: Date,         // Using Date instead of String
      required: true,
    },
    dueDate: {
      type: Date,         // Using Date instead of String
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash", "Card", "Bank Transfer", "Online"], // Optional: restricts to valid methods
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Paid", "Unpaid", "Pending", "Overdue"],   // Optional: restricts to valid statuses
      default: "Pending",
    },
    notes: {
      type: String,
      required: false,    // Allows this to be optional
      default: "",
    },
  },
  {
    timestamps: true,    // Adds createdAt and updatedAt
  }
);

const Invoice = mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);

export default Invoice;
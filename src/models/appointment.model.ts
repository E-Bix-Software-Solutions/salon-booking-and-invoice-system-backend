import mongoose, { Schema, Document } from "mongoose";
import type { IAppointment } from "../types/appointment.ts";

export interface IAppointmentDocument extends IAppointment, Document {}

const AppointmentSchema = new Schema<IAppointmentDocument>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    staff: {
      type: Schema.Types.ObjectId,
      ref: "staff",
      required: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Partially Paid", "Paid"],
      default: "Unpaid",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model<IAppointmentDocument>("Appointment", AppointmentSchema);
export default Appointment;

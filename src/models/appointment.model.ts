import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  staff: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  paymentStatus: string;
  price: number;
  notes?: string;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
    },
    staff: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "Pending",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
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

const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);
export default Appointment;

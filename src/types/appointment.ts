import mongoose from "mongoose";

export type AppointmentFormData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  staff: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  paymentStatus: string;
  notes: string;
};

export interface IAppointment {
  customer: mongoose.Types.ObjectId;
  staff: mongoose.Types.ObjectId;
  service: string;
  appointmentDate: Date;
  appointmentTime: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  paymentStatus: "Unpaid" | "Partially Paid" | "Paid";
  notes?: string;
}
import type { Request, Response } from "express";
import mongoose from "mongoose";
import Appointment from "../models/appointment.model.ts";
import Customer from "../models/customer.model.ts";
import Staff from "../models/staff.model.ts";
import logger from "../config/logger.ts";

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await Appointment.find().populate("customer staff");
    res.status(200).send(appointments);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("customer staff");
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    res.status(200).send(appointment);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      service,
      staff: staffRef,
      appointmentDate,
      appointmentTime,
      status,
      paymentStatus,
      notes,
    } = req.body;

    let customer = await Customer.findOne({
      $or: [{ email: customerEmail }, { phone: customerPhone }],
    });

    if (!customer) {
      customer = await Customer.create({
        fullName: customerName,
        email: customerEmail,
        phone: customerPhone,
      });
    }

    let staffMember = null;
    if (mongoose.Types.ObjectId.isValid(staffRef)) {
      staffMember = await Staff.findById(staffRef);
    }
    if (!staffMember) {
      staffMember = await Staff.findOne({ fullName: staffRef });
    }

    if (!staffMember) {
      res.status(404).json({ success: false, message: "Staff member not found" });
      return;
    }

    const appointment = await Appointment.create({
      customer: customer._id,
      staff: staffMember._id,
      service,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: status || "Pending",
      paymentStatus: paymentStatus || "Unpaid",
      notes: notes || "",
    });

    const populatedAppointment = await Appointment.findById(appointment._id).populate("customer staff");
    res.status(201).send(populatedAppointment);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      service,
      staff: staffRef,
      appointmentDate,
      appointmentTime,
      status,
      paymentStatus,
      notes,
    } = req.body;

    const updateData: any = {};
    if (service !== undefined) updateData.service = service;
    if (appointmentDate !== undefined) updateData.appointmentDate = new Date(appointmentDate);
    if (appointmentTime !== undefined) updateData.appointmentTime = appointmentTime;
    if (status !== undefined) updateData.status = status;
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
    if (notes !== undefined) updateData.notes = notes;

    if (customerEmail || customerPhone || customerName) {
      let customer = await Customer.findOne({
        $or: [
          ...(customerEmail ? [{ email: customerEmail }] : []),
          ...(customerPhone ? [{ phone: customerPhone }] : []),
        ],
      });
      if (!customer && customerName && (customerEmail || customerPhone)) {
        customer = await Customer.create({
          fullName: customerName,
          email: customerEmail || "",
          phone: customerPhone || "",
        });
      }
      if (customer) {
        updateData.customer = customer._id;
      }
    }

    if (staffRef !== undefined) {
      let staffMember = null;
      if (mongoose.Types.ObjectId.isValid(staffRef)) {
        staffMember = await Staff.findById(staffRef);
      }
      if (!staffMember) {
        staffMember = await Staff.findOne({ fullName: staffRef });
      }
      if (!staffMember) {
        res.status(404).json({ success: false, message: "Staff member not found" });
        return;
      }
      updateData.staff = staffMember._id;
    }

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("customer staff");
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    res.status(200).send(appointment);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    res.status(200).send(appointment);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

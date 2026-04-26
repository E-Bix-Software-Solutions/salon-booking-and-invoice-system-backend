import type { Request, NextFunction, Response } from "express";
import Staff from "../models/staff.model.ts";

class StaffListCreateController {
  getStaff = async (req: Request, res: Response) => {
    try {
      const staff = await Staff.find();
      return res.status(200).send(staff);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  saveStaff = async (req: Request, res: Response) => {
    try {
      const staff = await Staff.create(req.body);
      return res.status(200).send(staff);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}

class StaffListUpdateController {
  editStaffMember = async (req: Request, res: Response) => {
    try {
      const staff = await Staff.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).send(staff);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  inactivateStaffMember = async (req: Request, res: Response) => {
    try {
      const staff = await Staff.findByIdAndUpdate(req.params.id, {
        status: "inactive",
      }, { new: true });
      return res.status(200).send(staff);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  activateStaffMember = async (req: Request, res: Response) => {
    try {
      const staff = await Staff.findByIdAndUpdate(req.params.id, {
        status: "active",
      }, { new: true });
      return res.status(200).send(staff);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  getStaffMember = async (req: Request, res: Response) => {
    try {
      const staff = await Staff.findById(req.params.id);
      return res.status(200).send(staff);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}

export { StaffListCreateController, StaffListUpdateController };

import express from "express";
import { StaffListCreateController, StaffListUpdateController  } from "../controllers/staff.controller.ts";

const staffListCreateController = new StaffListCreateController();
const staffListUpdateController = new StaffListUpdateController();

const staffRouter = express.Router();
staffRouter.get("/", staffListCreateController.getStaff);
staffRouter.post("/", staffListCreateController.saveStaff);
staffRouter.get("/:id", staffListUpdateController.getStaffMember);
staffRouter.put("/:id", staffListUpdateController.editStaffMember);
staffRouter.patch("/inactive/:id", staffListUpdateController.inactivateStaffMember);
staffRouter.patch("/active/:id", staffListUpdateController.activateStaffMember);

export default staffRouter;
import express from "express";
import {
  StaffListCreateController,
  StaffListUpdateController,
} from "../controllers/staff.controller.ts";
import { protect, authorizeRoles } from "../middleware/auth.middleware.ts";

const staffListCreateController = new StaffListCreateController();
const staffListUpdateController = new StaffListUpdateController();

const staffRouter = express.Router();
staffRouter.get(
  "/",
  protect,
  authorizeRoles("admin"),
  staffListCreateController.getStaff,
);
staffRouter.post("/", staffListCreateController.saveStaff);
staffRouter.get("/:id", staffListUpdateController.getStaffMember);
staffRouter.put("/:id", staffListUpdateController.editStaffMember);
staffRouter.patch(
  "/inactive/:id",
  staffListUpdateController.inactivateStaffMember,
);
staffRouter.patch("/active/:id", staffListUpdateController.activateStaffMember);

export default staffRouter;

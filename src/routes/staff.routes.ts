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
staffRouter.post(
  "/",
  protect,
  authorizeRoles("admin"),
  staffListCreateController.saveStaff,
);
staffRouter.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  staffListUpdateController.getStaffMember,
);
staffRouter.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  staffListUpdateController.editStaffMember,
);
staffRouter.patch(
  "/inactive/:id",
  protect,
  authorizeRoles("admin"),
  staffListUpdateController.inactivateStaffMember,
);
staffRouter.patch(
  "/active/:id",
  protect,
  authorizeRoles("admin"),
  staffListUpdateController.activateStaffMember,
);

export default staffRouter;

import { Router } from "express";
import { protect } from "../middleware/auth.middleware.ts";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller.ts";

const appointmentRouter = Router();

appointmentRouter.use(protect);

appointmentRouter.route("/")
  .get(getAllAppointments)
  .post(createAppointment);

appointmentRouter.route("/:id")
  .get(getAppointmentById)
  .put(updateAppointment)
  .delete(deleteAppointment);

export default appointmentRouter;

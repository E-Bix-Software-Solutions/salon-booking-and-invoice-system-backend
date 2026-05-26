import express from "express";
import { getDashboardAnalytics } from "../controllers/dashboard.controller.ts";
import { protect, authorizeRoles } from "../middleware/auth.middleware.ts";

const dashboardRouter = express.Router();

// GET /api/dashboard/analytics - Admin only
dashboardRouter.get("/analytics", protect, authorizeRoles("admin"), getDashboardAnalytics);

export default dashboardRouter;

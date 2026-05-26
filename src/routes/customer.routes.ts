import express from "express";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.ts";
import { handleImageUpload } from "../middleware/upload.middleware.ts";

const customerRouter = express.Router();

customerRouter.get("/", getAllCustomers);
customerRouter.get("/:id", getCustomerById);
customerRouter.post("/", handleImageUpload("salon/customers"), createCustomer);
customerRouter.put("/:id", handleImageUpload("salon/customers"), updateCustomer);
customerRouter.delete("/:id", deleteCustomer);

export default customerRouter;

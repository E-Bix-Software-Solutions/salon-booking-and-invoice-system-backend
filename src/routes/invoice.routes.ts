import { Router } from "express";
import { authorizeRoles, protect } from "../middleware/auth.middleware.ts";
import { 
    InvoiceListCreateView, 
    InvoiceListUpdateDestroyView 
} from "../controllers/invoice.controller.ts";

const invoiceRouter = Router();

const listCreateView = new InvoiceListCreateView();
const updateDestroyView = new InvoiceListUpdateDestroyView();

invoiceRouter.use(protect, authorizeRoles("admin"));

invoiceRouter.route("/")
    .get(listCreateView.getInvoice)     
    .post(listCreateView.saveInvoice);  

invoiceRouter.route("/:id")
    .get(updateDestroyView.getInvoiceById)    
    .put(updateDestroyView.editInvoice)       
    .delete(updateDestroyView.deleteInvoice); 

invoiceRouter.patch("/:id/status", updateDestroyView.editInvoiceStatus); 

export default invoiceRouter;
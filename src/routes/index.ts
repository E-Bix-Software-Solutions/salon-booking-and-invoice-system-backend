import { Router } from "express";
import authRouter from "./auth.routes.ts";
import customerRouter from "./customer.routes.ts";
import staffRouter from "./staff.routes.ts";
import uploadRouter from "./upload.routes.ts";
import dashboardRouter from "./dashboard.routes.ts";
import userRouter from "./user.routes.ts";
import invoiceRouter from "./invoice.routes.ts";


const Rootrouter = Router();
Rootrouter.use("/auth", authRouter);
Rootrouter.use("/customer", customerRouter);
Rootrouter.use("/staff", staffRouter);
Rootrouter.use("/upload", uploadRouter);
Rootrouter.use("/dashboard", dashboardRouter);
Rootrouter.use("/user",userRouter);
Rootrouter.use("/invoice", invoiceRouter)

export default Rootrouter;
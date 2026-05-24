import { Router } from "express";
import authRouter from "./auth.routes.ts";
import customerRouter from "./customer.routes.ts";
import staffRouter from "./staff.routes.ts";
import uploadRouter from "./upload.routes.ts";


const Rootrouter = Router();
Rootrouter.use("/auth", authRouter);
Rootrouter.use("/customers", customerRouter);
Rootrouter.use("/staff", staffRouter);
Rootrouter.use("/upload", uploadRouter);

export default Rootrouter;
import { Router } from "express";
import authRouter from "./auth.routes";
import customerRouter from "./customer.routes";
import staffRouter from "./staff.routes";
import uploadRouter from "./upload.routes";


const Rootrouter = Router();
Rootrouter.use("/auth", authRouter);
Rootrouter.use("/customers", customerRouter);
Rootrouter.use("/staff", staffRouter);
Rootrouter.use("/upload", uploadRouter);

export default Rootrouter;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import staffRouter from "./routes/staff.routes.ts";
import connectDB from "./config/db.ts";
import authRouter from "./routes/auth.routes.ts";
import uploadRouter from "./routes/upload.routes.ts";
import { configureCloudinary } from "./config/cloudinary.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
})
app.use("/api/auth", authRouter);
app.use("/api/staff", staffRouter);
app.use("/api/upload", uploadRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  configureCloudinary();

  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
};

startServer();
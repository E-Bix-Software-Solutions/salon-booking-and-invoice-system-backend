import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import staffRouter from "./routes/staff.routes.ts";
import connectDB from "./config/db.ts";
import authRouter from "./routes/auth.routes.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/staff", staffRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
};

startServer();
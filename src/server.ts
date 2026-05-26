import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import kookieParser from "cookie-parser";
import connectDB from "./config/db.ts";
import { configureCloudinary } from "./config/cloudinary.ts";
import Rootrouter from "./routes/index.ts";
import { errorHandler } from "./middleware/errorHandler.middleware.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(kookieParser());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
})
app.use("/api", Rootrouter);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;


const startServer = async () => {
  await connectDB();
  configureCloudinary();

  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
};

startServer();
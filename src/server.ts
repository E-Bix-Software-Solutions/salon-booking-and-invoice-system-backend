import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import { configureCloudinary } from "./config/cloudinary.ts";
import { errorHandler } from "./middleware/errorHandler.middleware.ts";
import Rootrouter from "./routes/index.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
app.use("/api" , Rootrouter)
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
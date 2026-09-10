import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import assessmentRoutes from "./routes/assessment.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/assessments", assessmentRoutes);
app.use("/api/conversations", conversationRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SAKHI-AI backend is running",
  });
});

app.use(errorHandler);

export default app;

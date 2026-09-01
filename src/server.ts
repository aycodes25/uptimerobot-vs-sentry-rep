import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Allow JSON requests
app.use(express.json());

// Home route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "UptimeRobot vs Sentry Monitoring API is running",
  });
});

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Controlled error route
app.get(
  "/test-error",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new Error("This is a controlled test error for Sentry");
    } catch (error) {
      next(error);
    }
  }
);

// User routes
app.use("/users", userRoutes);

// Error handler MUST come after routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);

  const sentryEventId = (res as any).sentry ?? null;

  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
    sentryEventId,
  });
};
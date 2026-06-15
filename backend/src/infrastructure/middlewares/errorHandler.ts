import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../../shared/errors/AppError.js";

/**
 * Shape of any error that may reach the global error handler.
 * Both operational {@link AppError} instances and unexpected
 * runtime errors satisfy this interface.
 */
interface HttpError {
  statusCode?: number;
  status?: string;
  message?: string;
  stack?: string;
  isOperational?: boolean;
}

export const errorHandler: ErrorRequestHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500;
  const status = err.status ?? "error";

  const response = {
    status,
    message: err.message ?? "Something went wrong",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  };

  console.error(`[Error] ${statusCode} - ${err.message}`);
  if (err.stack && process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json(response);
};

export { AppError };

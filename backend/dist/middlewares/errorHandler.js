/**
 * Custom operational error class for the application.
 */
export class AppError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
/**
 * Global Express Error Handling Middleware.
 */
export const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    const response = {
        status,
        message: err.message || "Something went wrong",
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    };
    // Log error details for the developer
    console.error(`[Error] ${statusCode} - ${err.message}`);
    if (err.stack && process.env.NODE_ENV === "development") {
        console.error(err.stack);
    }
    res.status(statusCode).json(response);
};
//# sourceMappingURL=errorHandler.js.map
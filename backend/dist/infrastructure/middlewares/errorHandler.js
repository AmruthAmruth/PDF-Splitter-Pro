import { AppError } from "../../shared/errors/AppError.js";
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
    console.error(`[Error] ${statusCode} - ${err.message}`);
    if (err.stack && process.env.NODE_ENV === "development") {
        console.error(err.stack);
    }
    res.status(statusCode).json(response);
};
export { AppError };
//# sourceMappingURL=errorHandler.js.map
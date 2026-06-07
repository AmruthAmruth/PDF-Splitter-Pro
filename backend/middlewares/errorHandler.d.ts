import type { ErrorRequestHandler } from "express";
/**
 * Custom operational error class for the application.
 */
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly status: string;
    readonly isOperational: boolean;
    constructor(message: string, statusCode: number);
}
/**
 * Global Express Error Handling Middleware.
 */
export declare const errorHandler: ErrorRequestHandler;
//# sourceMappingURL=errorHandler.d.ts.map
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler, AppError } from "./middlewares/errorHandler.js";
// Load environment variables
dotenv.config();
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});
// Root Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to PDF Splitter Pro API" });
});
// Fallback Route for Undefined Endpoints
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Global Error Handler Middleware
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map
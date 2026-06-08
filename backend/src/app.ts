import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./infrastructure/middlewares/errorHandler.js";
import { AppError } from "./shared/errors/AppError.js";
import pdfRouter from "./infrastructure/routes/pdfRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pdf-splitter-5vmp391ln-amruth-shyjus-projects.vercel.app"
  ],
  credentials: true
}));

// Parse JSON and URL-encoded data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});   


// API Documentation Route

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to PDF Splitter Pro API" });
});

// API Routes
app.use("/api/pdfs", pdfRouter);

// Fallback Route for Undefined Endpoints
app.all("/*splat", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;

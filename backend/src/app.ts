import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./infrastructure/middlewares/errorHandler.js";
import { AppError } from "./shared/errors/AppError.js";
import pdfRouter from "./infrastructure/routes/pdfRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://pdf-splitter-pro.vercel.app",
  "https://pdf-splitter-5vmp391ln-amruth-shyjus-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options(
  /.*/,
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running smoothly",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to PDF Splitter Pro API",
  });
});

app.use("/api/pdfs", pdfRouter);

app.all("/*splat", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
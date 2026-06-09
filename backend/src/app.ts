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

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("/*splat", cors(corsOptions));

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
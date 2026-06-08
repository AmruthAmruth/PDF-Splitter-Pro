import mongoose, { Document, Schema } from "mongoose";

export interface IPdfDocument extends Document {
  fileName: string;
  pagesCount: number;
  status: "uploaded" | "processing" | "completed" | "failed";
  originalPath: string;
  createdAt: Date;
  updatedAt: Date;
}

const pdfSchema = new Schema<IPdfDocument>(
  {
    fileName: {
      type: String,
      required: true,
    },
    pagesCount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },
    originalPath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PdfModel = mongoose.model<IPdfDocument>("Pdf", pdfSchema);

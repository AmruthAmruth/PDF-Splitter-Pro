import mongoose, { Document, Schema } from "mongoose";
const pdfSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["uploaded", "processing", "completed", "failed"],
        default: "uploaded"
    },
    originalPath: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
export const PdfModel = mongoose.model("Pdf", pdfSchema);
//# sourceMappingURL=pdfModel.js.map
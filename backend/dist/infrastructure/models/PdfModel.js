import mongoose, { Document, Schema } from "mongoose";
const pdfSchema = new Schema({
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
}, {
    timestamps: true,
});
export const PdfModel = mongoose.model("Pdf", pdfSchema);
//# sourceMappingURL=PdfModel.js.map
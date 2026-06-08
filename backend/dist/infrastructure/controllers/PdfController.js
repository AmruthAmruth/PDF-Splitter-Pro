import { UploadPdfUseCase } from "../../application/use-cases/UploadPdfUseCase.js";
import { GetPdfUseCase } from "../../application/use-cases/GetPdfUseCase.js";
import { ExtractPdfUseCase } from "../../application/use-cases/ExtractPdfUseCase.js";
import { AppError } from "../../shared/errors/AppError.js";
import fs from "fs";
export class PdfController {
    uploadPdfUseCase;
    getPdfUseCase;
    extractPdfUseCase;
    constructor(uploadPdfUseCase, getPdfUseCase, extractPdfUseCase) {
        this.uploadPdfUseCase = uploadPdfUseCase;
        this.getPdfUseCase = getPdfUseCase;
        this.extractPdfUseCase = extractPdfUseCase;
    }
    upload = async (req, res, next) => {
        try {
            if (!req.file) {
                throw new AppError("No file uploaded or invalid file format", 400);
            }
            const dto = {
                fileName: req.file.originalname,
                filePath: req.file.path,
                pagesCount: 0,
            };
            const pdf = await this.uploadPdfUseCase.execute(dto);
            res.status(201).json({
                status: "success",
                data: pdf,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            if (typeof id !== "string") {
                throw new AppError("Invalid PDF ID format", 400);
            }
            const pdf = await this.getPdfUseCase.execute(id);
            res.status(200).json({
                status: "success",
                data: pdf,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getFile = async (req, res, next) => {
        try {
            const { id } = req.params;
            if (typeof id !== "string") {
                throw new AppError("Invalid PDF ID format", 400);
            }
            const pdf = await this.getPdfUseCase.execute(id);
            if (!fs.existsSync(pdf.originalPath)) {
                throw new AppError("PDF file not found on server storage", 404);
            }
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `inline; filename="${pdf.fileName}"`);
            const fileStream = fs.createReadStream(pdf.originalPath);
            fileStream.pipe(res);
        }
        catch (error) {
            next(error);
        }
    };
    extract = async (req, res, next) => {
        try {
            const { id } = req.params;
            if (typeof id !== "string") {
                throw new AppError("Invalid PDF ID format", 400);
            }
            const { selectedPages } = req.body;
            if (!Array.isArray(selectedPages)) {
                throw new AppError("selectedPages must be an array of page indices", 400);
            }
            const parsedPages = selectedPages.map((p) => {
                const num = Number(p);
                if (isNaN(num)) {
                    throw new AppError("selectedPages must contain only numbers", 400);
                }
                return num;
            });
            const { buffer, fileName } = await this.extractPdfUseCase.execute(id, {
                selectedPages: parsedPages,
            });
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
            res.send(buffer);
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=PdfController.js.map
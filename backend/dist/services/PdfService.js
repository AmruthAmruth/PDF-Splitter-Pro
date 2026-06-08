import { AppError } from "../middlewares/errorHandler.js";
export class PdfService {
    pdfRepository;
    constructor(pdfRepository) {
        this.pdfRepository = pdfRepository;
    }
    async createPdf(pdf) {
        if (!pdf.fileName || pdf.fileName.trim().length === 0) {
            throw new AppError("File name is required", 400);
        }
        if (!pdf.pages || pdf.pages <= 0) {
            throw new AppError("Pages must be a positive number", 400);
        }
        if (!pdf.originalPath || pdf.originalPath.trim().length === 0) {
            throw new AppError("Original file path is required", 400);
        }
        const newPdf = {
            fileName: pdf.fileName.trim(),
            pages: pdf.pages,
            status: "uploaded",
            originalPath: pdf.originalPath,
        };
        return await this.pdfRepository.create(newPdf);
    }
    async updatePdf(pdf) {
        if (!pdf.id) {
            throw new AppError("PDF ID is required for update", 400);
        }
        const existingPdf = await this.pdfRepository.findById(pdf.id);
        if (!existingPdf) {
            throw new AppError(`PDF with id ${pdf.id} not found`, 404);
        }
        return await this.pdfRepository.update(pdf);
    }
    async deletePdf(id) {
        if (!id || id.trim().length === 0) {
            throw new AppError("PDF ID is required for deletion", 400);
        }
        const existingPdf = await this.pdfRepository.findById(id);
        if (!existingPdf) {
            throw new AppError(`PDF with id ${id} not found`, 404);
        }
        return await this.pdfRepository.delete(id);
    }
    async getPdfById(id) {
        if (!id || id.trim().length === 0) {
            throw new AppError("PDF ID is required", 400);
        }
        return await this.pdfRepository.findById(id);
    }
    async getAllPdfs() {
        return await this.pdfRepository.findAll();
    }
}
//# sourceMappingURL=PdfService.js.map
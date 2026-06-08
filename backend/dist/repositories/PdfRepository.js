import { PdfModel } from "../models/pdfModel.js";
/**
 * Concrete implementation of the IPdfRepository interface.
 * Responsible solely for data access operations (SRP).
 * All business logic belongs in the service layer.
 */
export class PdfRepository {
    /**
     * Maps a Mongoose document to a plain IPdf DTO.
     * Extracted as a private method to avoid duplication (DRY).
     */
    toDto(doc) {
        return {
            id: doc._id.toString(),
            fileName: doc.fileName,
            pages: doc.pages,
            status: doc.status,
            originalPath: doc.originalPath,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
    async create(pdf) {
        const createdPdf = await PdfModel.create(pdf);
        return this.toDto(createdPdf);
    }
    async update(pdf) {
        if (!pdf.id) {
            throw new Error("Cannot update a PDF without an ID");
        }
        const updatedPdf = await PdfModel.findByIdAndUpdate(pdf.id, pdf, { new: true });
        if (!updatedPdf) {
            throw new Error(`PDF with id ${pdf.id} not found`);
        }
        return this.toDto(updatedPdf);
    }
    async findAll() {
        const pdfs = await PdfModel.find();
        return pdfs.map((pdf) => this.toDto(pdf));
    }
    async findById(id) {
        const pdf = await PdfModel.findById(id);
        if (!pdf)
            return null;
        return this.toDto(pdf);
    }
    async delete(id) {
        const deletedPdf = await PdfModel.findByIdAndDelete(id);
        return deletedPdf !== null;
    }
}
//# sourceMappingURL=PdfRepository.js.map
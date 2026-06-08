import { PdfModel } from "../models/PdfModel.js";
export class MongoPdfRepository {
    toEntity(doc) {
        return {
            id: doc._id.toString(),
            fileName: doc.fileName,
            pagesCount: doc.pagesCount,
            status: doc.status,
            originalPath: doc.originalPath,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
    async create(pdf) {
        const created = await PdfModel.create({
            fileName: pdf.fileName,
            pagesCount: pdf.pagesCount,
            status: pdf.status,
            originalPath: pdf.originalPath,
        });
        return this.toEntity(created);
    }
    async findById(id) {
        const doc = await PdfModel.findById(id);
        if (!doc)
            return null;
        return this.toEntity(doc);
    }
    async update(pdf) {
        if (!pdf.id) {
            throw new Error("Cannot update a PDF without an ID");
        }
        const updated = await PdfModel.findByIdAndUpdate(pdf.id, {
            fileName: pdf.fileName,
            pagesCount: pdf.pagesCount,
            status: pdf.status,
            originalPath: pdf.originalPath,
        }, { new: true });
        if (!updated) {
            throw new Error(`PDF with id ${pdf.id} not found`);
        }
        return this.toEntity(updated);
    }
    async delete(id) {
        const result = await PdfModel.findByIdAndDelete(id);
        return result !== null;
    }
    async findAll() {
        const docs = await PdfModel.find();
        return docs.map((doc) => this.toEntity(doc));
    }
}
//# sourceMappingURL=MongoPdfRepository.js.map
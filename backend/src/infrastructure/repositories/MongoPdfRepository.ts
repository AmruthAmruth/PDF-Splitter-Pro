import type { PdfEntity } from "../../domain/entities/PdfEntity.js";
import type { IPdfRepository } from "../../domain/repositories/IPdfRepository.js";
import { PdfModel } from "../models/PdfModel.js";
import type { IPdfDocument } from "../models/PdfModel.js";

export class MongoPdfRepository implements IPdfRepository {
  private toEntity(doc: IPdfDocument): PdfEntity {
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

  async create(pdf: PdfEntity): Promise<PdfEntity> {
    const created = await PdfModel.create({
      fileName: pdf.fileName,
      pagesCount: pdf.pagesCount,
      status: pdf.status,
      originalPath: pdf.originalPath,
    });
    return this.toEntity(created);
  }

  async findById(id: string): Promise<PdfEntity | null> {
    const doc = await PdfModel.findById(id);
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async update(pdf: PdfEntity): Promise<PdfEntity> {
    if (!pdf.id) {
      throw new Error("Cannot update a PDF without an ID");
    }
    const updated = await PdfModel.findByIdAndUpdate(
      pdf.id,
      {
        fileName: pdf.fileName,
        pagesCount: pdf.pagesCount,
        status: pdf.status,
        originalPath: pdf.originalPath,
      },
      { new: true }
    );
    if (!updated) {
      throw new Error(`PDF with id ${pdf.id} not found`);
    }
    return this.toEntity(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await PdfModel.findByIdAndDelete(id);
    return result !== null;
  }

  async findAll(): Promise<PdfEntity[]> {
    const docs = await PdfModel.find();
    return docs.map((doc) => this.toEntity(doc));
  }
}

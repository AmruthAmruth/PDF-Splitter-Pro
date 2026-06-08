import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import type { IPdfLibService } from "../interfaces/IPdfLibService.js";
import { AppError } from "../../shared/errors/AppError.js";

export class PdfLibService implements IPdfLibService {
  async getPagesCount(pdfBuffer: Buffer): Promise<number> {
    try {
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      return pdfDoc.getPageCount();
    } catch (error: any) {
      throw new AppError(`Failed to parse PDF pages: ${error.message}`, 400);
    }
  }

  async extractPages(originalPath: string, selectedPages: number[]): Promise<Buffer> {
    try {
      const existingPdfBytes = await fs.readFile(originalPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const totalPages = pdfDoc.getPageCount();

      for (const pageIndex of selectedPages) {
        if (pageIndex < 0 || pageIndex >= totalPages) {
          throw new AppError(
            `Invalid page selection: Index ${pageIndex} is out of bounds (0 to ${totalPages - 1})`,
            400
          );
        }
      }

      const newPdfDoc = await PDFDocument.create();
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, selectedPages);
      copiedPages.forEach((page) => newPdfDoc.addPage(page));

      const pdfBytes = await newPdfDoc.save();
      return Buffer.from(pdfBytes);
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new AppError(`Failed to extract pages: ${error.message}`, 500);
    }
  }
}

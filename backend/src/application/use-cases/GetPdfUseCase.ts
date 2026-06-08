import type { PdfEntity } from "../../domain/entities/PdfEntity.js";
import type { IPdfRepository } from "../../domain/repositories/IPdfRepository.js";
import { AppError } from "../../shared/errors/AppError.js";

export class GetPdfUseCase {
  constructor(private pdfRepository: IPdfRepository) {}

  async execute(id: string): Promise<PdfEntity> {
    const pdf = await this.pdfRepository.findById(id);
    if (!pdf) {
      throw new AppError(`PDF with ID ${id} not found`, 404);
    }
    return pdf;
  }
}

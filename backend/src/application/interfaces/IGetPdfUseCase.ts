import type { PdfEntity } from "../../domain/entities/PdfEntity.js";

/**
 * Contract for the get-PDF-by-ID use case.
 * Throws {@link AppError} with status 404 when the PDF is not found.
 */
export interface IGetPdfUseCase {
  execute(id: string): Promise<PdfEntity>;
}

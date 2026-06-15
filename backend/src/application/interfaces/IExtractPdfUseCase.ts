import type { PdfExtractDto } from "../dto/PdfExtractDto.js";

/**
 * Result produced by the extract-pages use case.
 */
export interface ExtractPdfResult {
  /** Binary content of the newly created PDF. */
  buffer: Buffer;
  /** Suggested download file name (e.g. `report_extracted.pdf`). */
  fileName: string;
}

/**
 * Contract for the extract-pages-from-PDF use case.
 * Throws {@link AppError} (404) when the PDF is not found and
 * {@link AppError} (400) when the page selection is invalid.
 */
export interface IExtractPdfUseCase {
  execute(id: string, dto: PdfExtractDto): Promise<ExtractPdfResult>;
}

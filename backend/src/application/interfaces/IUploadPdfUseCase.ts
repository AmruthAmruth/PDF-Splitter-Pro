import type { PdfEntity } from "../../domain/entities/PdfEntity.js";
import type { PdfUploadDto } from "../dto/PdfUploadDto.js";

/**
 * Contract for the upload PDF use case.
 * Any implementation must accept a {@link PdfUploadDto} and
 * resolve with the persisted {@link PdfEntity}.
 */
export interface IUploadPdfUseCase {
  execute(dto: PdfUploadDto): Promise<PdfEntity>;
}

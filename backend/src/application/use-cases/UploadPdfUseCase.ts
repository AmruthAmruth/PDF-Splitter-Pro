import type { PdfEntity } from "../../domain/entities/PdfEntity.js";
import type { IPdfRepository } from "../../domain/repositories/IPdfRepository.js";
import type { IPdfLibService } from "../../infrastructure/interfaces/IPdfLibService.js";
import type { IUploadPdfUseCase } from "../interfaces/IUploadPdfUseCase.js";
import type { PdfUploadDto } from "../dto/PdfUploadDto.js";
import fs from "fs/promises";

export class UploadPdfUseCase implements IUploadPdfUseCase {
  constructor(
    private pdfRepository: IPdfRepository,
    private pdfLibService: IPdfLibService
  ) {}

  async execute(dto: PdfUploadDto): Promise<PdfEntity> {
    const fileBuffer = await fs.readFile(dto.filePath);
    const pagesCount = await this.pdfLibService.getPagesCount(fileBuffer);

    const pdfEntity: PdfEntity = {
      fileName: dto.fileName,
      pagesCount,
      status: "uploaded",
      originalPath: dto.filePath,
    };

    return await this.pdfRepository.create(pdfEntity);
  }
}

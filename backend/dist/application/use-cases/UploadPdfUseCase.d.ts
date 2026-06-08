import type { PdfEntity } from "../../domain/entities/PdfEntity.js";
import type { IPdfRepository } from "../../domain/repositories/IPdfRepository.js";
import type { IPdfLibService } from "../../infrastructure/interfaces/IPdfLibService.js";
import type { PdfUploadDto } from "../dto/PdfUploadDto.js";
export declare class UploadPdfUseCase {
    private pdfRepository;
    private pdfLibService;
    constructor(pdfRepository: IPdfRepository, pdfLibService: IPdfLibService);
    execute(dto: PdfUploadDto): Promise<PdfEntity>;
}
//# sourceMappingURL=UploadPdfUseCase.d.ts.map
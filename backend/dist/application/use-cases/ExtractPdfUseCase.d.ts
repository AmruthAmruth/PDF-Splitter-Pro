import type { IPdfRepository } from "../../domain/repositories/IPdfRepository.js";
import type { IPdfLibService } from "../../infrastructure/interfaces/IPdfLibService.js";
import type { PdfExtractDto } from "../dto/PdfExtractDto.js";
export declare class ExtractPdfUseCase {
    private pdfRepository;
    private pdfLibService;
    constructor(pdfRepository: IPdfRepository, pdfLibService: IPdfLibService);
    execute(id: string, dto: PdfExtractDto): Promise<{
        buffer: Buffer;
        fileName: string;
    }>;
}
//# sourceMappingURL=ExtractPdfUseCase.d.ts.map
import type { PdfEntity } from "../../domain/entities/PdfEntity.js";
import type { IPdfRepository } from "../../domain/repositories/IPdfRepository.js";
export declare class GetPdfUseCase {
    private pdfRepository;
    constructor(pdfRepository: IPdfRepository);
    execute(id: string): Promise<PdfEntity>;
}
//# sourceMappingURL=GetPdfUseCase.d.ts.map
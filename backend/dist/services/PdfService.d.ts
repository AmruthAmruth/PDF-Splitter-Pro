import type { IPdf } from "../interface/IPdf.js";
import type { IPdfService } from "../interface/IPdfService.js";
import type { IPdfRepository } from "../interface/IPdfRepository.js";
export declare class PdfService implements IPdfService {
    private readonly pdfRepository;
    constructor(pdfRepository: IPdfRepository);
    createPdf(pdf: IPdf): Promise<IPdf>;
    updatePdf(pdf: IPdf): Promise<IPdf>;
    deletePdf(id: string): Promise<boolean>;
    getPdfById(id: string): Promise<IPdf | null>;
    getAllPdfs(): Promise<IPdf[]>;
}
//# sourceMappingURL=PdfService.d.ts.map
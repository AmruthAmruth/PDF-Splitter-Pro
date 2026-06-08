import type { Request, Response, NextFunction } from "express";
import { UploadPdfUseCase } from "../../application/use-cases/UploadPdfUseCase.js";
import { GetPdfUseCase } from "../../application/use-cases/GetPdfUseCase.js";
import { ExtractPdfUseCase } from "../../application/use-cases/ExtractPdfUseCase.js";
export declare class PdfController {
    private uploadPdfUseCase;
    private getPdfUseCase;
    private extractPdfUseCase;
    constructor(uploadPdfUseCase: UploadPdfUseCase, getPdfUseCase: GetPdfUseCase, extractPdfUseCase: ExtractPdfUseCase);
    upload: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getFile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    extract: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=PdfController.d.ts.map
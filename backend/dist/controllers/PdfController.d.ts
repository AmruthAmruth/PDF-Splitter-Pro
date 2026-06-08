import type { Request, Response, NextFunction } from "express";
import type { IPdfService } from "../interface/IPdfService.js";
/**
 * PdfController — handles HTTP request/response for PDF endpoints.
 *
 * Single Responsibility: Only translates HTTP ↔ Service calls.
 * Dependency Inversion: Depends on IPdfService abstraction, not a concrete class.
 */
export declare class PdfController {
    private readonly pdfService;
    constructor(pdfService: IPdfService);
    createPdf: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllPdfs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPdfById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatePdf: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletePdf: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=PdfController.d.ts.map
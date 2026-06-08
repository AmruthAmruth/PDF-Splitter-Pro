import type { IPdf } from "./IPdf.js";
/**
 * Service contract for PDF business logic operations.
 * Follows the Interface Segregation Principle — this interface is separate
 * from the repository interface because the service layer may have different
 * method signatures, validation rules, or additional business operations
 * that don't belong in the data access layer.
 */
export interface IPdfService {
    createPdf(pdf: IPdf): Promise<IPdf>;
    updatePdf(pdf: IPdf): Promise<IPdf>;
    deletePdf(id: string): Promise<boolean>;
    getPdfById(id: string): Promise<IPdf | null>;
    getAllPdfs(): Promise<IPdf[]>;
}
//# sourceMappingURL=IPdfService.d.ts.map
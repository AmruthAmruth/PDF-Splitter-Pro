import type { IPdf } from "../interface/IPdf.js";
import type { IPdfRepository } from "../interface/IPdfRepository.js";
/**
 * Concrete implementation of the IPdfRepository interface.
 * Responsible solely for data access operations (SRP).
 * All business logic belongs in the service layer.
 */
export declare class PdfRepository implements IPdfRepository {
    /**
     * Maps a Mongoose document to a plain IPdf DTO.
     * Extracted as a private method to avoid duplication (DRY).
     */
    private toDto;
    create(pdf: IPdf): Promise<IPdf>;
    update(pdf: IPdf): Promise<IPdf>;
    findAll(): Promise<IPdf[]>;
    findById(id: string): Promise<IPdf | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=PdfRepository.d.ts.map
import type { IPdf } from "./IPdf.js";
/**
 * Repository contract for PDF persistence operations.
 * Follows the Repository Pattern — responsible only for data access.
 */
export interface IPdfRepository {
    create(pdf: IPdf): Promise<IPdf>;
    update(pdf: IPdf): Promise<IPdf>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<IPdf | null>;
    findAll(): Promise<IPdf[]>;
}
//# sourceMappingURL=IPdfRepository.d.ts.map
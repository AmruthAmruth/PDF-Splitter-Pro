import type { PdfEntity } from "../../domain/entities/PdfEntity.js";
import type { IPdfRepository } from "../../domain/repositories/IPdfRepository.js";
export declare class MongoPdfRepository implements IPdfRepository {
    private toEntity;
    create(pdf: PdfEntity): Promise<PdfEntity>;
    findById(id: string): Promise<PdfEntity | null>;
    update(pdf: PdfEntity): Promise<PdfEntity>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<PdfEntity[]>;
}
//# sourceMappingURL=MongoPdfRepository.d.ts.map
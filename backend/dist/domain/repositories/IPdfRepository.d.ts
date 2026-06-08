import type { PdfEntity } from "../entities/PdfEntity.js";
export interface IPdfRepository {
    create(pdf: PdfEntity): Promise<PdfEntity>;
    findById(id: string): Promise<PdfEntity | null>;
    update(pdf: PdfEntity): Promise<PdfEntity>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<PdfEntity[]>;
}
//# sourceMappingURL=IPdfRepository.d.ts.map
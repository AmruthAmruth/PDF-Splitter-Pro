import type { IPdfLibService } from "../interfaces/IPdfLibService.js";
export declare class PdfLibService implements IPdfLibService {
    getPagesCount(pdfBuffer: Buffer): Promise<number>;
    extractPages(originalPath: string, selectedPages: number[]): Promise<Buffer>;
}
//# sourceMappingURL=PdfLibService.d.ts.map
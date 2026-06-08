export interface IPdfLibService {
    getPagesCount(pdfBuffer: Buffer): Promise<number>;
    extractPages(originalPath: string, selectedPages: number[]): Promise<Buffer>;
}
//# sourceMappingURL=IPdfLibService.d.ts.map
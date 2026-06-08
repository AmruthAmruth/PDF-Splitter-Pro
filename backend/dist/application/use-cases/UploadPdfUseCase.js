import fs from "fs/promises";
export class UploadPdfUseCase {
    pdfRepository;
    pdfLibService;
    constructor(pdfRepository, pdfLibService) {
        this.pdfRepository = pdfRepository;
        this.pdfLibService = pdfLibService;
    }
    async execute(dto) {
        const fileBuffer = await fs.readFile(dto.filePath);
        const pagesCount = await this.pdfLibService.getPagesCount(fileBuffer);
        const pdfEntity = {
            fileName: dto.fileName,
            pagesCount,
            status: "uploaded",
            originalPath: dto.filePath,
        };
        return await this.pdfRepository.create(pdfEntity);
    }
}
//# sourceMappingURL=UploadPdfUseCase.js.map
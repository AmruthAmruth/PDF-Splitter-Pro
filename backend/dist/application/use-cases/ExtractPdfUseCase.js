import { AppError } from "../../shared/errors/AppError.js";
export class ExtractPdfUseCase {
    pdfRepository;
    pdfLibService;
    constructor(pdfRepository, pdfLibService) {
        this.pdfRepository = pdfRepository;
        this.pdfLibService = pdfLibService;
    }
    async execute(id, dto) {
        const pdf = await this.pdfRepository.findById(id);
        if (!pdf) {
            throw new AppError(`PDF with ID ${id} not found`, 404);
        }
        if (!dto.selectedPages || dto.selectedPages.length === 0) {
            throw new AppError("Page selection cannot be empty", 400);
        }
        const buffer = await this.pdfLibService.extractPages(pdf.originalPath, dto.selectedPages);
        const dotIndex = pdf.fileName.lastIndexOf(".");
        const baseName = dotIndex !== -1 ? pdf.fileName.substring(0, dotIndex) : pdf.fileName;
        const extractedFileName = `${baseName}_extracted.pdf`;
        return {
            buffer,
            fileName: extractedFileName,
        };
    }
}
//# sourceMappingURL=ExtractPdfUseCase.js.map
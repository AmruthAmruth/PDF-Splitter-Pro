import { AppError } from "../../shared/errors/AppError.js";
export class GetPdfUseCase {
    pdfRepository;
    constructor(pdfRepository) {
        this.pdfRepository = pdfRepository;
    }
    async execute(id) {
        const pdf = await this.pdfRepository.findById(id);
        if (!pdf) {
            throw new AppError(`PDF with ID ${id} not found`, 404);
        }
        return pdf;
    }
}
//# sourceMappingURL=GetPdfUseCase.js.map
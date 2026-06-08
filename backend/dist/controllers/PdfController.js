/**
 * PdfController — handles HTTP request/response for PDF endpoints.
 *
 * Single Responsibility: Only translates HTTP ↔ Service calls.
 * Dependency Inversion: Depends on IPdfService abstraction, not a concrete class.
 */
export class PdfController {
    pdfService;
    constructor(pdfService) {
        this.pdfService = pdfService;
    }
    createPdf = async (req, res, next) => {
        try {
            const pdf = await this.pdfService.createPdf(req.body);
            res.status(201).json({ status: "success", data: pdf });
        }
        catch (error) {
            next(error);
        }
    };
    getAllPdfs = async (req, res, next) => {
        try {
            const pdfs = await this.pdfService.getAllPdfs();
            res.status(200).json({ status: "success", results: pdfs.length, data: pdfs });
        }
        catch (error) {
            next(error);
        }
    };
    getPdfById = async (req, res, next) => {
        try {
            const { id } = req.params;
            if (typeof id !== "string") {
                res.status(400).json({ status: "fail", message: "PDF ID must be a string" });
                return;
            }
            const pdf = await this.pdfService.getPdfById(id);
            if (!pdf) {
                res.status(404).json({ status: "fail", message: "PDF not found" });
                return;
            }
            res.status(200).json({ status: "success", data: pdf });
        }
        catch (error) {
            next(error);
        }
    };
    updatePdf = async (req, res, next) => {
        try {
            const { id } = req.params;
            if (typeof id !== "string") {
                res.status(400).json({ status: "fail", message: "PDF ID must be a string" });
                return;
            }
            const pdf = await this.pdfService.updatePdf({ ...req.body, id });
            res.status(200).json({ status: "success", data: pdf });
        }
        catch (error) {
            next(error);
        }
    };
    deletePdf = async (req, res, next) => {
        try {
            const { id } = req.params;
            if (typeof id !== "string") {
                res.status(400).json({ status: "fail", message: "PDF ID must be a string" });
                return;
            }
            await this.pdfService.deletePdf(id);
            res.status(200).json({ status: "success", message: "PDF deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=PdfController.js.map
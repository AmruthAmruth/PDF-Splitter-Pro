import { Router } from "express";
import { PdfController } from "../controllers/PdfController.js";
import { MongoPdfRepository } from "../repositories/MongoPdfRepository.js";
import { PdfLibService } from "../services/PdfLibService.js";
import { UploadPdfUseCase } from "../../application/use-cases/UploadPdfUseCase.js";
import { GetPdfUseCase } from "../../application/use-cases/GetPdfUseCase.js";
import { ExtractPdfUseCase } from "../../application/use-cases/ExtractPdfUseCase.js";
import { upload } from "../middlewares/uploadMiddleware.js";
// Instantiations (Dependency Injection)
const pdfRepository = new MongoPdfRepository();
const pdfLibService = new PdfLibService();
const uploadPdfUseCase = new UploadPdfUseCase(pdfRepository, pdfLibService);
const getPdfUseCase = new GetPdfUseCase(pdfRepository);
const extractPdfUseCase = new ExtractPdfUseCase(pdfRepository, pdfLibService);
const pdfController = new PdfController(uploadPdfUseCase, getPdfUseCase, extractPdfUseCase);
const pdfRouter = Router();
// Routes
pdfRouter.post("/upload", upload.single("pdf"), pdfController.upload);
pdfRouter.get("/:id", pdfController.getById);
pdfRouter.get("/:id/file", pdfController.getFile);
pdfRouter.post("/:id/extract", pdfController.extract);
export default pdfRouter;
//# sourceMappingURL=pdfRoutes.js.map
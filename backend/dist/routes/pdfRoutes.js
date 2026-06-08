import { Router } from "express";
import { PdfController } from "../controllers/PdfController.js";
import { PdfService } from "../services/PdfService.js";
import { PdfRepository } from "../repositories/PdfRepository.js";
const pdfRepository = new PdfRepository();
const pdfService = new PdfService(pdfRepository);
const pdfController = new PdfController(pdfService);
const pdfRouter = Router();
pdfRouter.post("/", pdfController.createPdf);
pdfRouter.get("/", pdfController.getAllPdfs);
pdfRouter.get("/:id", pdfController.getPdfById);
pdfRouter.put("/:id", pdfController.updatePdf);
pdfRouter.delete("/:id", pdfController.deletePdf);
export default pdfRouter;
//# sourceMappingURL=pdfRoutes.js.map
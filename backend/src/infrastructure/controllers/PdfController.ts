import type { Request, Response, NextFunction } from "express";
import type { IUploadPdfUseCase } from "../../application/interfaces/IUploadPdfUseCase.js";
import type { IGetPdfUseCase } from "../../application/interfaces/IGetPdfUseCase.js";
import type { IExtractPdfUseCase } from "../../application/interfaces/IExtractPdfUseCase.js";
import type { IPdfController } from "../interfaces/IPdfController.js";
import { AppError } from "../../shared/errors/AppError.js";
import fs from "fs";

export class PdfController implements IPdfController {
  constructor(
    private uploadPdfUseCase: IUploadPdfUseCase,
    private getPdfUseCase: IGetPdfUseCase,
    private extractPdfUseCase: IExtractPdfUseCase
  ) {}

  upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        throw new AppError("No file uploaded or invalid file format", 400);
      }

      const dto = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        pagesCount: 0,
      };

      const pdf = await this.uploadPdfUseCase.execute(dto);
      res.status(201).json({
        status: "success",
        data: pdf,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        throw new AppError("Invalid PDF ID format", 400);
      }
      const pdf = await this.getPdfUseCase.execute(id);
      res.status(200).json({
        status: "success",
        data: pdf,
      });
    } catch (error) {
      next(error);
    }
  };

  getFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        throw new AppError("Invalid PDF ID format", 400);
      }
      const pdf = await this.getPdfUseCase.execute(id);

      if (!fs.existsSync(pdf.originalPath)) {
        throw new AppError("PDF file not found on server storage", 404);
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="${pdf.fileName}"`);
      const fileStream = fs.createReadStream(pdf.originalPath);
      fileStream.pipe(res);
    } catch (error) {
      next(error);
    }
  };

  extract = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        throw new AppError("Invalid PDF ID format", 400);
      }
      const { selectedPages } = req.body;

      if (!Array.isArray(selectedPages)) {
        throw new AppError("selectedPages must be an array of page indices", 400);
      }

      const parsedPages = selectedPages.map((p) => {
        const num = Number(p);
        if (isNaN(num)) {
          throw new AppError("selectedPages must contain only numbers", 400);
        }
        return num;
      });

      const { buffer, fileName } = await this.extractPdfUseCase.execute(id, {
        selectedPages: parsedPages,
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };
}

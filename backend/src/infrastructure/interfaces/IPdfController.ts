import type { Request, Response, NextFunction } from "express";

/**
 * Contract for the PDF HTTP controller.
 * Every method follows the Express middleware signature so that
 * the router can bind them directly without any wrapper.
 */
export interface IPdfController {
  /** POST /api/pdfs/upload — accepts a multipart PDF upload. */
  upload(req: Request, res: Response, next: NextFunction): Promise<void>;

  /** GET /api/pdfs/:id — returns the PDF metadata record. */
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;

  /** GET /api/pdfs/:id/file — streams the raw PDF file to the client. */
  getFile(req: Request, res: Response, next: NextFunction): Promise<void>;

  /** POST /api/pdfs/:id/extract — extracts selected pages and returns a new PDF. */
  extract(req: Request, res: Response, next: NextFunction): Promise<void>;
}

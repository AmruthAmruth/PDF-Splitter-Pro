/**
 * Data Transfer Object representing a PDF entity.
 * This is the application-level representation, decoupled from the database layer.
 */
export interface IPdf {
    id?: string;
    fileName: string;
    pages: number;
    status: "uploaded" | "processing" | "completed" | "failed";
    originalPath: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=IPdf.d.ts.map
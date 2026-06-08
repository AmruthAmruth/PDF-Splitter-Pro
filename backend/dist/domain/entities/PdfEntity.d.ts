export interface PdfEntity {
    id?: string;
    fileName: string;
    pagesCount: number;
    status: "uploaded" | "processing" | "completed" | "failed";
    originalPath: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=PdfEntity.d.ts.map
import mongoose, { Document } from "mongoose";
export interface IPdfDocument extends Document {
    fileName: string;
    pagesCount: number;
    status: "uploaded" | "processing" | "completed" | "failed";
    originalPath: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PdfModel: mongoose.Model<IPdfDocument, {}, {}, {}, mongoose.Document<unknown, {}, IPdfDocument, {}, mongoose.DefaultSchemaOptions> & IPdfDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPdfDocument>;
//# sourceMappingURL=PdfModel.d.ts.map
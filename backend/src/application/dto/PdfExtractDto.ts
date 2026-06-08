export interface PdfExtractDto {
  selectedPages: number[]; // 0-based or 1-based indices. Let's design it as 0-based index.
}

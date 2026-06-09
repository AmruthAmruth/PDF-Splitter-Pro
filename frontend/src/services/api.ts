const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/pdfs";

export interface PdfMetadata {
  id: string;
  fileName: string;
  pagesCount: number;
  status: "uploaded" | "processing" | "completed" | "failed";
  createdAt: string;
}

export const uploadPdf = async (file: File): Promise<PdfMetadata> => {
  const formData = new FormData();
  formData.append("pdf", file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to upload PDF");
  }

  const result = await response.json();
  return result.data;
};

export const getPdfMetadata = async (id: string): Promise<PdfMetadata> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch PDF details");
  }

  const result = await response.json();
  return result.data;
};

export const getPdfFileUrl = (id: string): string => {
  return `${BASE_URL}/${id}/file`;
};

export const extractPdfPages = async (
  id: string,
  selectedPages: number[]
): Promise<Blob> => {
  const response = await fetch(`${BASE_URL}/${id}/extract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedPages }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Extraction failed");
  }

  return await response.blob();
};
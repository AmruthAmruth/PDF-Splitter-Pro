import { useState } from "react";
import { FileDown, RefreshCw, Scissors, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { PDFUploader } from "./components/PDFUploader";
import { PDFPreviewer } from "./components/PDFPreviewer";
import { uploadPdf, extractPdfPages, getPdfFileUrl } from "./services/api";
import type { PdfMetadata } from "./services/api";

function App() {
  const [pdfMeta, setPdfMeta] = useState<PdfMetadata | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [extractError, setExtractError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    setSelectedPages([]);
    try {
      const metadata = await uploadPdf(file);
      setPdfMeta(metadata);
    } catch (err: any) {
      setUploadError(err.message || "Failed to process PDF file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleExtract = async () => {
    if (!pdfMeta) return;

    if (selectedPages.length === 0) {
      setExtractError("Please select at least one page to extract.");
      return;
    }

    setIsExtracting(true);
    setExtractError(null);
    try {
      const blob = await extractPdfPages(pdfMeta.id, selectedPages);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const dotIndex = pdfMeta.fileName.lastIndexOf(".");
      const baseName = dotIndex !== -1 ? pdfMeta.fileName.substring(0, dotIndex) : pdfMeta.fileName;
      link.download = `${baseName}_extracted.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Trigger party confetti celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#3b82f6", "#10b981"],
      });
    } catch (err: any) {
      setExtractError(err.message || "An error occurred during extraction.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleReset = () => {
    setPdfMeta(null);
    setSelectedPages([]);
    setUploadError(null);
    setExtractError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Header Banner */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Scissors className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                PDF Splitter Pro
              </h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
               Split PDFs in Seconds
              </p>
            </div>
          </div>

          {pdfMeta && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 font-medium rounded-lg transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Upload New
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col justify-center">
        {!pdfMeta ? (
          <div className="space-y-8 text-center max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 animate-pulse-slow" />
                <span>Extract pages instantly from any PDF</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
                PDF Page Extractor &amp; Rearranger
              </h2>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
                Simply upload your document, choose the pages you want to keep, rearrange their ordering as needed, and download your new optimized PDF file.
              </p>
            </div>

            <PDFUploader
              onUploadSuccess={handleUpload}
              isLoading={isUploading}
              error={uploadError}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Document Header Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/20">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                  Active Document
                </span>
                <h2 className="text-2xl font-bold text-slate-200 mt-1 truncate max-w-md md:max-w-xl">
                  {pdfMeta.fileName}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Total PDF pages: {pdfMeta.pagesCount}
                </p>
              </div>

              {/* Action trigger button */}
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <button
                  onClick={handleExtract}
                  disabled={selectedPages.length === 0 || isExtracting}
                  className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                    selectedPages.length === 0
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                      : isExtracting
                      ? "bg-purple-950 text-purple-300 border border-purple-500/30"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.98]"
                  }`}
                >
                  {isExtracting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <FileDown className="h-5 w-5" />
                      Extract &amp; Download PDF ({selectedPages.length})
                    </>
                  )}
                </button>
                {selectedPages.length === 0 && (
                  <span className="text-[10px] text-slate-500">
                    * Select at least one page to download
                  </span>
                )}
              </div>
            </div>

            {/* Error notifications */}
            {extractError && (
              <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
                {extractError}
              </div>
            )}

            {/* Render Previewer and Drag/Drop Sorting controls */}
            <PDFPreviewer
              fileUrl={getPdfFileUrl(pdfMeta.id)}
              pagesCount={pdfMeta.pagesCount}
              selectedPages={selectedPages}
              setSelectedPages={setSelectedPages}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600">
        <p>© 2026 PDF Splitter Pro — Split PDFs in Seconds.</p>
      </footer>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Check, Columns, Shuffle, Trash2, MoveRight, HelpCircle } from "lucide-react";

// Set worker source to the local URL resolved by Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

interface PDFPreviewerProps {
  fileUrl: string;
  pagesCount: number;
  selectedPages: number[];
  setSelectedPages: React.Dispatch<React.SetStateAction<number[]>>;
}

export const PDFPreviewer: React.FC<PDFPreviewerProps> = ({
  fileUrl,
  pagesCount,
  selectedPages,
  setSelectedPages,
}) => {
  const [renderedThumbnails, setRenderedThumbnails] = useState<Record<number, string>>({});
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    const loadAndRenderPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: fileUrl,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`,
        });
        const pdf = await loadingTask.promise;
        if (!active) return;

        const thumbnails: Record<number, string> = {};

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (!active) break;
          try {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 0.35 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            if (context) {
              // Fill background with white to handle transparent PDFs correctly
              context.fillStyle = "#ffffff";
              context.fillRect(0, 0, canvas.width, canvas.height);

              await page.render({ canvasContext: context, viewport, canvas }).promise;
              const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
              thumbnails[pageNum - 1] = dataUrl;
              setRenderedThumbnails((prev) => ({ ...prev, [pageNum - 1]: dataUrl }));
            }
          } catch (e) {
            console.error(`Error rendering page ${pageNum}:`, e);
          }
        }
      } catch (err) {
        console.error("Error loading PDF:", err);
      }
    };

    loadAndRenderPdf();
    return () => {
      active = false;
    };
  }, [fileUrl]);

  const togglePageSelection = (pageIndex: number) => {
    setSelectedPages((prev) =>
      prev.includes(pageIndex)
        ? prev.filter((p) => p !== pageIndex)
        : [...prev, pageIndex]
    );
  };

  const handleSelectAll = () => {
    setSelectedPages(Array.from({ length: pagesCount }, (_, i) => i));
  };

  const handleClearAll = () => {
    setSelectedPages([]);
  };

  // Drag-and-drop reordering for the selection sequence
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setSelectedPages((prev) => {
      const updated = [...prev];
      const [draggedItem] = updated.splice(draggedIndex, 1);
      updated.splice(index, 0, draggedItem);
      return updated;
    });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => setDraggedIndex(null);

  const removePageFromSelection = (indexToRemove: number) => {
    setSelectedPages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full space-y-8">
      {/* Control Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl glass-panel glass-glow">
        <div>
          <h2 className="text-xl font-semibold text-slate-200">Select &amp; Organize Pages</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Click pages to select them. Drag thumbnails in the sequence panel to reorder.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-all duration-200"
          >
            <Columns className="h-4 w-4" />
            Select All
          </button>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-900/60 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/20 font-medium rounded-xl transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Page Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: pagesCount }).map((_, idx) => {
          const isSelected = selectedPages.includes(idx);
          const selectionOrder = selectedPages.indexOf(idx) + 1;
          const thumbnail = renderedThumbnails[idx];

          return (
            <div
              key={idx}
              onClick={() => togglePageSelection(idx)}
              className={`group relative flex flex-col items-center p-2.5 rounded-2xl border cursor-pointer select-none transition-all duration-200 ${
                isSelected
                  ? "border-purple-500 bg-purple-500/5 shadow-[0_0_18px_rgba(168,85,247,0.18)] scale-[1.02]"
                  : "border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-600"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[3/4] bg-slate-950/80 rounded-xl overflow-hidden border border-slate-800 group-hover:border-slate-700 transition-colors">
                {!thumbnail ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-6 w-6 border-2 border-slate-700 border-t-purple-500 rounded-full animate-spin" />
                  </div>
                ) : (
                  <img
                    src={thumbnail}
                    alt={`Page ${idx + 1}`}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                )}

                {/* Checkbox */}
                <div
                  className={`absolute top-1.5 right-1.5 h-5 w-5 rounded-md flex items-center justify-center transition-all duration-200 border ${
                    isSelected
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-black/40 border-slate-600 text-transparent group-hover:border-slate-400"
                  }`}
                >
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>

                {/* Order Badge */}
                {isSelected && (
                  <div className="absolute bottom-1.5 left-1.5 bg-slate-950/80 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    #{selectionOrder}
                  </div>
                )}
              </div>

              <div className="mt-2 text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                Page {idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Extraction Sequence (drag-to-reorder) */}
      {selectedPages.length > 0 && (
        <div className="p-6 rounded-2xl border border-purple-500/20 bg-purple-950/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Shuffle className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-slate-200">Extraction Sequence</h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              {selectedPages.length} {selectedPages.length === 1 ? "page" : "pages"} selected
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-950/30 border border-purple-900/40 p-2.5 rounded-lg">
            <HelpCircle className="h-3.5 w-3.5 shrink-0" />
            <span>Drag the thumbnails below to reorder pages in the output PDF.</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto py-3 px-1 min-h-[130px]">
            {selectedPages.map((pageIdx, index) => {
              const thumbnail = renderedThumbnails[pageIdx];
              return (
                <div
                  key={`seq-${pageIdx}-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className="flex items-center gap-3 shrink-0"
                >
                  <div
                    className={`relative group/seq w-20 aspect-[3/4] rounded-xl border overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-200 ${
                      draggedIndex === index
                        ? "border-purple-400 scale-105 opacity-75"
                        : "border-purple-500/30 hover:border-purple-400"
                    } bg-slate-900`}
                  >
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={`Seq ${pageIdx + 1}`}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-950" />
                    )}

                    {/* Page label */}
                    <div className="absolute top-1 left-1 bg-black/60 text-slate-300 text-[9px] px-1 rounded">
                      P.{pageIdx + 1}
                    </div>

                    {/* Remove on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/seq:opacity-100 flex items-center justify-center transition-all duration-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePageFromSelection(index);
                        }}
                        className="p-1 rounded-lg bg-red-600 hover:bg-red-500 text-white"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Order badge */}
                    <div className="absolute bottom-1 right-1 bg-purple-600/90 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>

                  {index < selectedPages.length - 1 && (
                    <MoveRight className="h-4 w-4 text-slate-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

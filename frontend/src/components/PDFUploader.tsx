import React, { useState, useRef } from "react";
import { Upload, FileText, AlertTriangle } from "lucide-react";

interface PDFUploaderProps {
  onUploadSuccess: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export const PDFUploader: React.FC<PDFUploaderProps> = ({
  onUploadSuccess,
  isLoading,
  error,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const validateAndUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        onUploadSuccess(file);
      } else {
        alert("Invalid file type. Please upload a PDF file.");
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    validateAndUpload(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndUpload(e.target.files);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          isDragActive
            ? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
            : "border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-900/80"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleChange}
          disabled={isLoading}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-slate-800 text-slate-400 group-hover:text-purple-400 group-hover:bg-purple-950/40 transition-all duration-300">
            {isLoading ? (
              <div className="h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="h-10 w-10" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-medium text-slate-200">
              {isLoading ? "Reading and processing PDF..." : "Upload your PDF file"}
            </h3>
            <p className="text-sm text-slate-400">
              Drag and drop your file here, or click to select
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-800/40 px-3 py-1.5 rounded-full">
            <FileText className="h-3.5 w-3.5" />
            <span>Accepts only .pdf files</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center space-x-2.5 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

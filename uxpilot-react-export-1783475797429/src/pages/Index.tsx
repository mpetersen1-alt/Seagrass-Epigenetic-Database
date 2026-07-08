import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EpiNavBar from "@/components/EpiNavBar";

export default function Index() {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleRunPipeline = () => {
    navigate("/processing");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--eg-bg)", fontFamily: "'Work Sans', sans-serif" }}
    >
      <EpiNavBar />

      {/* Page content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        {/* Page title block */}
        <div className="w-full max-w-2xl mb-8">
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "var(--eg-muted-text)", fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.16em" }}
          >
            Epigenetic Analysis Pipeline
          </p>
          <h1
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ color: "var(--eg-foreground)" }}
          >
            File Ingestion
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--eg-secondary)" }}
          >
            Upload a FASTQ genome file to initiate the methylation analysis workflow.
          </p>
        </div>

        {/* Metadata row */}
        <div
          className="w-full max-w-2xl flex flex-wrap gap-x-6 gap-y-2 mb-6 pb-5"
          style={{ borderBottom: "1px solid var(--eg-border)" }}
        >
          {[
            { label: "REFERENCE", value: "GRCh38.p14" },
            { label: "PIPELINE VER", value: "bismark_v0.24.2" },
            { label: "ACCEPTED FORMATS", value: ".fastq / .fastq.gz" },
            { label: "MAX FILE SIZE", value: "50 GB" },
          ].map((item) => (
            <div key={item.label}>
              <span
                className="text-xs block"
                style={{ color: "var(--eg-muted-text)", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "10px" }}
              >
                {item.label}
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: "var(--eg-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Drop Zone */}
        <div
          className="w-full max-w-2xl relative cursor-pointer transition-all"
          style={{
            border: isDragOver
              ? "2px dashed var(--eg-btn-primary)"
              : uploadedFile
              ? "2px dashed var(--eg-accent)"
              : "2px dashed #c8d8da",
            borderRadius: "4px",
            backgroundColor: isDragOver
              ? "rgba(13,148,136,0.03)"
              : uploadedFile
              ? "rgba(27,212,136,0.03)"
              : "#ffffff",
            minHeight: "280px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "40px 24px",
            transition: "all 0.15s ease",
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".fastq,.fastq.gz,.fq,.fq.gz"
            className="hidden"
            onChange={handleFileInput}
          />

          {uploadedFile ? (
            <>
              <div
                className="flex items-center justify-center w-10 h-10"
                style={{
                  border: "1px solid var(--eg-accent)",
                  borderRadius: "4px",
                  backgroundColor: "rgba(27,212,136,0.08)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3L10 13M10 13L6 9M10 13L14 9" stroke="#1bd488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 14V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V14" stroke="#1bd488" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-center">
                <p
                  className="text-sm font-mono font-medium"
                  style={{ color: "var(--eg-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {uploadedFile.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--eg-accent)" }}
                >
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB — Ready for analysis
                </p>
              </div>
              <button
                className="text-xs underline"
                style={{ color: "var(--eg-muted-text)" }}
                onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
              >
                Remove file
              </button>
            </>
          ) : (
            <>
              <div
                className="flex items-center justify-center w-10 h-10"
                style={{
                  border: "1px solid var(--eg-border)",
                  borderRadius: "4px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 13L10 3M10 3L6 7M10 3L14 7" stroke="#45828b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 14V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V14" stroke="#45828b" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-center">
                <p
                  className="text-sm"
                  style={{ color: "var(--eg-muted-text)" }}
                >
                  Upload <span className="font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>.fastq</span> genome file
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "#a0b8bb" }}
                >
                  Drag &amp; drop or click to browse
                </p>
              </div>
            </>
          )}

          {/* Corner labels */}
          <span
            className="absolute top-3 left-3 text-xs font-mono"
            style={{ color: "#c8d8da", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
          >
            DROP_ZONE_01
          </span>
          <span
            className="absolute top-3 right-3 text-xs font-mono"
            style={{ color: isDragOver ? "var(--eg-btn-primary)" : "#c8d8da", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
          >
            {isDragOver ? "RECEIVING..." : "IDLE"}
          </span>
        </div>

        {/* Run Pipeline button */}
        <div className="w-full max-w-2xl mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            {uploadedFile && (
              <p
                className="text-xs font-mono"
                style={{ color: "var(--eg-muted-text)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                [READY] 1 file staged for processing
              </p>
            )}
            {!uploadedFile && (
              <p
                className="text-xs font-mono"
                style={{ color: "#a0b8bb", fontFamily: "'JetBrains Mono', monospace" }}
              >
                [WAITING] No file staged
              </p>
            )}
          </div>
          <button
            onClick={handleRunPipeline}
            className="text-sm font-semibold px-6 py-2.5 transition-all"
            style={{
              backgroundColor: "var(--eg-btn-primary)",
              color: "#ffffff",
              border: "1px solid var(--eg-btn-primary)",
              borderRadius: "4px",
              fontFamily: "'Work Sans', sans-serif",
              letterSpacing: "0.02em",
              cursor: "pointer",
              opacity: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0b7c72")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--eg-btn-primary)")}
          >
            Run Epigenetic Pipeline
          </button>
        </div>

        {/* Bottom info strip */}
        <div
          className="w-full max-w-2xl mt-10 pt-5 flex flex-wrap gap-x-6 gap-y-1"
          style={{ borderTop: "1px solid var(--eg-border)" }}
        >
          {[
            "Quality Control → Alignment → Methylation Extraction → Statistical Analysis → Report",
          ].map((item) => (
            <p key={item} className="text-xs font-mono w-full" style={{ color: "#a0b8bb", fontFamily: "'JetBrains Mono', monospace" }}>
              PIPELINE: {item}
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}
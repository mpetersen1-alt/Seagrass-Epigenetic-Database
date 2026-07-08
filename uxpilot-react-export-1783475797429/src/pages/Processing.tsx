import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EpiNavBar from "@/components/EpiNavBar";

const LOG_ENTRIES = [
  {
    id: 1,
    status: "OK",
    text: "Initializing Bismark alignment pipeline...",
    delay: 0,
  },
  {
    id: 2,
    status: "OK",
    text: "Loading reference genome GRCh38.p14...",
    delay: 600,
  },
  {
    id: 3,
    status: "OK",
    text: "Quality trimming with Trim Galore (Phred 20)...",
    delay: 1200,
  },
  {
    id: 4,
    status: "OK",
    text: "Aligning to reference genome...",
    delay: 1800,
  },
  {
    id: 5,
    status: "OK",
    text: "Scanning ~82M methylation sites...",
    delay: 2600,
  },
  {
    id: 6,
    status: "OK",
    text: "Extracting CpG methylation calls...",
    delay: 3400,
  },
  {
    id: 7,
    status: "OK",
    text: "Deduplication: removed 1,247,889 PCR duplicates...",
    delay: 4200,
  },
  {
    id: 8,
    status: "WAIT",
    text: "Analyzing CHH methylation at HSP70 promoters...",
    delay: 5000,
  },
  {
    id: 9,
    status: "WAIT",
    text: "Running differential methylation analysis (DMRfinder)...",
    delay: 5800,
  },
  {
    id: 10,
    status: "WAIT",
    text: "Generating genome-wide methylation coverage report...",
    delay: 6600,
  },
];

const TOTAL_DURATION = 8000;

export default function Processing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => setIsComplete(true), 400);
      }
    }, 50);

    const logTimers = LOG_ENTRIES.map((entry) =>
      setTimeout(() => {
        setVisibleLogs((prev) => [...prev, entry.id]);
      }, entry.delay)
    );

    return () => {
      clearInterval(progressInterval);
      logTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--eg-bg)", fontFamily: "'Work Sans', sans-serif" }}
    >
      <EpiNavBar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        {/* Page header */}
        <div className="w-full max-w-2xl mb-8">
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "var(--eg-muted-text)", letterSpacing: "0.16em" }}
          >
            Epigenetic Analysis Pipeline
          </p>
          <h1
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ color: "var(--eg-foreground)" }}
          >
            Processing
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--eg-secondary)" }}>
            Real-time pipeline execution log. Do not close this window.
          </p>
        </div>

        {/* Progress bar container */}
        <div
          className="w-full max-w-2xl mb-2"
          style={{ border: "1px solid var(--eg-border)", borderRadius: "4px", backgroundColor: "#ffffff", padding: "20px 24px" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-mono"
              style={{ color: "var(--eg-muted-text)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              PIPELINE PROGRESS
            </span>
            <span
              className="text-xs font-mono font-semibold"
              style={{
                color: isComplete ? "var(--eg-accent)" : "var(--eg-btn-primary)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress track */}
          <div
            className="w-full h-1.5 overflow-hidden"
            style={{ backgroundColor: "#e8f0f1", borderRadius: "2px" }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: isComplete ? "var(--eg-accent)" : "var(--eg-btn-primary)",
                borderRadius: "2px",
                transition: "width 0.1s linear",
              }}
            />
          </div>

          {/* Progress sub-info */}
          <div className="flex items-center justify-between mt-3">
            <span
              className="text-xs font-mono"
              style={{ color: "#a0b8bb", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
            >
              {isComplete ? "COMPLETED" : "RUNNING"} · bismark_v0.24.2
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: "#a0b8bb", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
            >
              GRCh38.p14
            </span>
          </div>
        </div>

        {/* Log feed */}
        <div
          className="w-full max-w-2xl"
          style={{
            border: "1px solid var(--eg-border)",
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
            backgroundColor: "#fafcfc",
            minHeight: "320px",
            maxHeight: "420px",
            overflowY: "auto",
            padding: "0",
          }}
        >
          {/* Log header */}
          <div
            className="px-5 py-2 flex items-center gap-2 sticky top-0"
            style={{
              backgroundColor: "#f0f5f5",
              borderBottom: "1px solid var(--eg-border)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isComplete ? "var(--eg-accent)" : "var(--eg-btn-primary)", animation: isComplete ? "none" : "pulse 1.2s infinite" }} />
            <span
              className="text-xs font-mono"
              style={{ color: "var(--eg-muted-text)", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.12em" }}
            >
              STDOUT LOG · THREAD_01
            </span>
          </div>

          {/* Log entries */}
          <div className="px-5 py-3 space-y-0.5">
            {LOG_ENTRIES.map((entry) => {
              const isVisible = visibleLogs.includes(entry.id);
              if (!isVisible) return null;

              const isOk = entry.status === "OK";
              return (
                <div
                  key={entry.id}
                  className="flex items-start gap-3 py-1.5"
                  style={{
                    borderBottom: "1px solid #f0f5f5",
                    animation: "fadeInUp 0.2s ease",
                  }}
                >
                  <span
                    className="text-xs font-mono shrink-0 mt-0.5 px-1.5 py-0.5"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: isOk ? "var(--eg-btn-primary)" : "#d97706",
                      backgroundColor: isOk ? "rgba(13,148,136,0.08)" : "rgba(217,119,6,0.08)",
                      border: `1px solid ${isOk ? "rgba(13,148,136,0.2)" : "rgba(217,119,6,0.2)"}`,
                      borderRadius: "2px",
                      lineHeight: 1,
                    }}
                  >
                    {entry.status}
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{
                      color: "var(--eg-foreground)",
                      fontFamily: "'JetBrains Mono', monospace",
                      lineHeight: 1.6,
                    }}
                  >
                    {entry.text}
                  </span>
                </div>
              );
            })}

            {/* Blinking cursor when not complete */}
            {!isComplete && visibleLogs.length > 0 && (
              <div className="flex items-center gap-2 py-1.5">
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--eg-btn-primary)", fontFamily: "'JetBrains Mono', monospace", animation: "blink 1s step-end infinite" }}
                >
                  ▋
                </span>
              </div>
            )}
          </div>
        </div>

        {/* View Results CTA — ghost style, appears on completion */}
        <div
          className="w-full max-w-2xl mt-8 flex items-center justify-between"
          style={{ opacity: isComplete ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <div>
            <p
              className="text-xs font-mono"
              style={{ color: "var(--eg-accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              [COMPLETE] All pipeline stages finished successfully.
            </p>
            <p
              className="text-xs font-mono mt-0.5"
              style={{ color: "var(--eg-muted-text)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Total runtime: 00:04:12 · 847,231 CpG sites quantified
            </p>
          </div>
          <button
            onClick={() => navigate("/results")}
            className="text-sm font-semibold px-6 py-2.5 transition-all"
            style={{
              backgroundColor: "transparent",
              color: "var(--eg-btn-primary)",
              border: "1px solid var(--eg-btn-primary)",
              borderRadius: "4px",
              fontFamily: "'Work Sans', sans-serif",
              cursor: isComplete ? "pointer" : "default",
            }}
            onMouseEnter={(e) => {
              if (isComplete) {
                e.currentTarget.style.backgroundColor = "rgba(13,148,136,0.06)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            View Results →
          </button>
        </div>

        {/* Pipeline stage tracker */}
        <div
          className="w-full max-w-2xl mt-6 pt-5 flex flex-wrap gap-x-0"
          style={{ borderTop: "1px solid var(--eg-border)" }}
        >
          {["QC", "ALIGN", "EXTRACT", "DMR", "REPORT"].map((stage, i, arr) => {
            const stageProgress = (i + 1) / arr.length;
            const stageActive = progress / 100 >= stageProgress - 0.15;
            const stageDone = progress / 100 >= stageProgress;
            return (
              <div key={stage} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: stageDone ? "var(--eg-accent)" : stageActive ? "var(--eg-btn-primary)" : "#d4dfe0",
                    }}
                  />
                  <span
                    className="text-xs font-mono mt-1"
                    style={{
                      color: stageDone ? "var(--eg-accent)" : stageActive ? "var(--eg-btn-primary)" : "#a0b8bb",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                    }}
                  >
                    {stage}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="h-px w-12 sm:w-20 mx-1 mb-3"
                    style={{ backgroundColor: stageDone ? "var(--eg-accent)" : "#d4dfe0" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
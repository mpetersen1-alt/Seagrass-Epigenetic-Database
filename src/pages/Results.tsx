import { useNavigate } from "react-router-dom";
import EpiNavBar from "@/components/EpiNavBar";

const SUMMARY_DATA = [
  { label: "SAMPLE ID", value: "SRR12345678", mono: true },
  { label: "GENOME BUILD", value: "GRCh38.p14", mono: true },
  { label: "TOTAL READS", value: "847,231,044", mono: true },
  { label: "MAPPED READS", value: "831,946,802 (98.2%)", mono: true },
  { label: "CpG SITES QUANTIFIED", value: "27,412,983", mono: true },
  { label: "MEAN CpG METHYLATION", value: "71.4%", mono: false },
  { label: "CHH METHYLATION", value: "0.83% (baseline)", mono: false },
  { label: "CHG METHYLATION", value: "0.31% (baseline)", mono: false },
  { label: "BISULFITE CONVERSION", value: "99.7%", mono: false },
  { label: "MAPPING EFFICIENCY", value: "98.2%", mono: false },
  { label: "ANALYSIS DATE", value: "2024-06-15 · 14:32 UTC", mono: true },
  { label: "PIPELINE VERSION", value: "bismark_v0.24.2", mono: true },
];

const INTERVENTIONS = [
  {
    id: "INT-001",
    priority: "HIGH",
    region: "HSP70 Promoter (chr6:31,791,171)",
    finding:
      "Hypermethylation detected at CpG island overlapping HSP70 (HSPA1A) promoter. Mean β-value: 0.87 vs. control 0.24.",
    implication:
      "Silencing of heat-shock response pathway. Associated with thermotolerance loss and accelerated protein aggregation phenotype.",
    action: "Validate with targeted bisulfite pyrosequencing at CpGs −421, −389, −307.",
    gene: "HSPA1A",
    deltaBeta: "+0.63",
    pValue: "1.4 × 10⁻¹²",
    status: "FLAGGED",
  },
  {
    id: "INT-002",
    priority: "HIGH",
    region: "BRCA1 Regulatory Element (chr17:43,106,455)",
    finding:
      "Aberrant hypermethylation across 14 CpG loci spanning the BRCA1 promoter CGI. Mean β-value: 0.79 vs. control 0.11.",
    implication:
      "Epigenetic silencing of BRCA1 DNA repair function. Consistent with BRCA1-like phenotype in sporadic breast/ovarian risk profiling.",
    action:
      "Cross-reference with somatic mutation panel (MLPA). Consider referral for genetic counselling.",
    gene: "BRCA1",
    deltaBeta: "+0.68",
    pValue: "3.2 × 10⁻¹⁵",
    status: "FLAGGED",
  },
  {
    id: "INT-003",
    priority: "MEDIUM",
    region: "IGF2/H19 Imprinting Control Region (chr11:2,019,285)",
    finding:
      "Loss of imprinting (LOI) at IGF2/H19 ICR. Biallelic methylation pattern observed; expected monoallelic.",
    implication:
      "Biallelic IGF2 expression. Elevated proliferative signalling. Associated with Wilms tumor risk and colorectal cancer predisposition.",
    action:
      "Confirm LOI with allele-specific expression analysis (RT-PCR + SNP genotyping). Consider colonoscopic surveillance.",
    gene: "IGF2 / H19",
    deltaBeta: "+0.41",
    pValue: "8.9 × 10⁻⁸",
    status: "MONITOR",
  },
  {
    id: "INT-004",
    priority: "LOW",
    region: "MLH1 Promoter (chr3:37,034,841)",
    finding:
      "Borderline methylation increase at MLH1 promoter. Mean β-value: 0.38 vs. control 0.19. Marginal CGI shore involvement.",
    implication:
      "Sub-threshold risk of MLH1 silencing. Lynch syndrome epigenotype not confirmed. Trend warrants longitudinal tracking.",
    action:
      "Re-assay in 12 months. No immediate clinical action required. Log in patient epigenetic registry.",
    gene: "MLH1",
    deltaBeta: "+0.19",
    pValue: "4.1 × 10⁻⁴",
    status: "MONITOR",
  },
];

const PRIORITY_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  HIGH: { color: "#c0392b", bg: "rgba(192,57,43,0.07)", border: "rgba(192,57,43,0.25)" },
  MEDIUM: { color: "#d97706", bg: "rgba(217,119,6,0.07)", border: "rgba(217,119,6,0.25)" },
  LOW: { color: "var(--eg-secondary)", bg: "rgba(69,130,139,0.07)", border: "rgba(69,130,139,0.25)" },
};

const STATUS_STYLE: Record<string, { color: string }> = {
  FLAGGED: { color: "#c0392b" },
  MONITOR: { color: "#d97706" },
  CLEAR: { color: "var(--eg-btn-primary)" },
};

export default function Results() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--eg-bg)", fontFamily: "'Work Sans', sans-serif" }}
    >
      <EpiNavBar />

      {/* Page sub-header */}
      <div
        className="w-full"
        style={{ borderBottom: "1px solid var(--eg-border)", backgroundColor: "#ffffff" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--eg-muted-text)", letterSpacing: "0.16em", fontSize: "10px" }}
            >
              Diagnostic Report · SRR12345678
            </p>
            <h1
              className="text-lg font-semibold tracking-tight mt-0.5"
              style={{ color: "var(--eg-foreground)" }}
            >
              Epigenetic Results
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono px-2 py-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--eg-accent)",
                border: "1px solid rgba(27,212,136,0.3)",
                borderRadius: "4px",
                backgroundColor: "rgba(27,212,136,0.06)",
              }}
            >
              ANALYSIS COMPLETE
            </span>
            <button
              onClick={() => navigate("/")}
              className="text-xs px-4 py-1.5 transition-all"
              style={{
                border: "1px solid var(--eg-border)",
                borderRadius: "4px",
                color: "var(--eg-secondary)",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontFamily: "'Work Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              New Analysis
            </button>
            <button
              className="text-xs px-4 py-1.5 transition-all"
              style={{
                border: "1px solid var(--eg-btn-primary)",
                borderRadius: "4px",
                color: "var(--eg-btn-primary)",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontFamily: "'Work Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(13,148,136,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex-1 max-w-screen-xl mx-auto w-full px-6 md:px-10 py-6">
        <div className="flex flex-col lg:flex-row gap-0 h-full" style={{ minHeight: "calc(100vh - 200px)" }}>

          {/* LEFT PANEL — 40% — Analysis Summary */}
          <div
            className="w-full lg:w-[40%] lg:shrink-0"
            style={{
              borderRight: "1px solid var(--eg-border)",
              paddingRight: "0",
            }}
          >
            <div
              className="h-full"
              style={{
                border: "1px solid var(--eg-border)",
                borderRadius: "4px 0 0 4px",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              {/* Panel header */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderBottom: "1px solid var(--eg-border)", backgroundColor: "#f7fafa" }}
              >
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{
                    color: "var(--eg-foreground)",
                    letterSpacing: "0.14em",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "10px",
                  }}
                >
                  Analysis Summary
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--eg-muted-text)", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
                >
                  12 METRICS
                </span>
              </div>

              {/* Data fields */}
              <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)" }}>
                {SUMMARY_DATA.map((item, i) => (
                  <div
                    key={item.label}
                    className="px-5 py-3 flex items-start justify-between gap-4"
                    style={{
                      borderBottom: i < SUMMARY_DATA.length - 1 ? "1px solid #f0f5f5" : "none",
                    }}
                  >
                    <span
                      className="text-xs shrink-0"
                      style={{
                        color: "var(--eg-muted-text)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontSize: "10px",
                        fontFamily: "'Work Sans', sans-serif",
                        lineHeight: 1.6,
                        minWidth: "120px",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-xs text-right"
                      style={{
                        color: "var(--eg-foreground)",
                        fontFamily: item.mono ? "'JetBrains Mono', monospace" : "'Work Sans', sans-serif",
                        fontWeight: 500,
                        lineHeight: 1.6,
                        wordBreak: "break-all",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quality score strip */}
              <div
                className="px-5 py-4 mt-auto"
                style={{ borderTop: "1px solid var(--eg-border)", backgroundColor: "#f7fafa" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest" style={{ color: "var(--eg-muted-text)", fontSize: "10px", letterSpacing: "0.14em" }}>
                    Quality Score
                  </span>
                  <span
                    className="text-sm font-semibold font-mono"
                    style={{ color: "var(--eg-btn-primary)", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    94/100
                  </span>
                </div>
                <div className="w-full h-1 rounded" style={{ backgroundColor: "#e8f0f1" }}>
                  <div className="h-full rounded" style={{ width: "94%", backgroundColor: "var(--eg-btn-primary)", borderRadius: "2px" }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  {[
                    { label: "QC", pct: 100 },
                    { label: "ALIGN", pct: 98 },
                    { label: "CONV", pct: 99 },
                    { label: "COVER", pct: 79 },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-xs font-mono" style={{ color: "var(--eg-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 600 }}>
                        {m.pct}%
                      </div>
                      <div className="text-xs" style={{ color: "var(--eg-muted-text)", fontSize: "9px", letterSpacing: "0.1em" }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — 60% — Actionable Interventions */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <div
              className="h-full"
              style={{
                border: "1px solid var(--eg-border)",
                borderLeft: "none",
                borderRadius: "0 4px 4px 0",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              {/* Panel header */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderBottom: "1px solid var(--eg-border)", backgroundColor: "#f7fafa" }}
              >
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{
                    color: "var(--eg-foreground)",
                    letterSpacing: "0.14em",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "10px",
                  }}
                >
                  Actionable Interventions
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "#c0392b", fontSize: "10px" }}>
                    ● 2 HIGH
                  </span>
                  <span className="text-xs" style={{ color: "#d97706", fontSize: "10px" }}>
                    ● 2 MEDIUM/LOW
                  </span>
                </div>
              </div>

              {/* Intervention cards */}
              <div
                className="overflow-y-auto px-5 py-4 space-y-4"
                style={{ maxHeight: "calc(100vh - 250px)" }}
              >
                {INTERVENTIONS.map((item) => {
                  const ps = PRIORITY_STYLE[item.priority];
                  const ss = STATUS_STYLE[item.status];
                  return (
                    <div
                      key={item.id}
                      className="p-4"
                      style={{
                        border: "1px solid var(--eg-border)",
                        borderLeft: `3px solid ${ps.color}`,
                        borderRadius: "4px",
                        backgroundColor: "#fafcfc",
                      }}
                    >
                      {/* Card header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-xs font-mono px-1.5 py-0.5"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              color: ps.color,
                              backgroundColor: ps.bg,
                              border: `1px solid ${ps.border}`,
                              borderRadius: "2px",
                              fontSize: "10px",
                            }}
                          >
                            {item.priority}
                          </span>
                          <span
                            className="text-xs font-mono"
                            style={{ color: "var(--eg-muted-text)", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
                          >
                            {item.id}
                          </span>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "var(--eg-foreground)", fontFamily: "'Work Sans', sans-serif" }}
                          >
                            {item.gene}
                          </span>
                        </div>
                        <span
                          className="text-xs font-mono"
                          style={{ color: ss.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
                        >
                          ◆ {item.status}
                        </span>
                      </div>

                      {/* Genomic region */}
                      <p
                        className="text-xs font-mono mb-2"
                        style={{
                          color: "var(--eg-secondary)",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px",
                        }}
                      >
                        {item.region}
                      </p>

                      {/* Delta / p-value strip */}
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <span className="text-xs" style={{ color: "var(--eg-muted-text)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            Δβ{" "}
                          </span>
                          <span
                            className="text-xs font-mono font-semibold"
                            style={{
                              color: item.deltaBeta.startsWith("+") ? "#c0392b" : "var(--eg-btn-primary)",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {item.deltaBeta}
                          </span>
                        </div>
                        <div
                          className="h-3 w-px"
                          style={{ backgroundColor: "var(--eg-border)" }}
                        />
                        <div>
                          <span className="text-xs" style={{ color: "var(--eg-muted-text)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            p-val{" "}
                          </span>
                          <span
                            className="text-xs font-mono font-semibold"
                            style={{ color: "var(--eg-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {item.pValue}
                          </span>
                        </div>
                      </div>

                      {/* Sections */}
                      {[
                        { heading: "Finding", text: item.finding },
                        { heading: "Clinical Implication", text: item.implication },
                        { heading: "Recommended Action", text: item.action },
                      ].map((section) => (
                        <div key={section.heading} className="mb-2">
                          <span
                            className="text-xs uppercase block mb-0.5"
                            style={{
                              color: "var(--eg-muted-text)",
                              letterSpacing: "0.1em",
                              fontFamily: "'Work Sans', sans-serif",
                              fontSize: "9px",
                            }}
                          >
                            {section.heading}
                          </span>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: "var(--eg-foreground)", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.6 }}
                          >
                            {section.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div
        className="w-full py-3"
        style={{ borderTop: "1px solid var(--eg-border)", backgroundColor: "#ffffff" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex flex-wrap items-center justify-between gap-2">
          <span
            className="text-xs font-mono"
            style={{ color: "#a0b8bb", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
          >
            REPORT_ID: EPG-2024-06-15-A3F7 · Generated by EpiGenome Pro v2.4.1
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: "#a0b8bb", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
          >
            FOR RESEARCH USE ONLY — NOT FOR CLINICAL DIAGNOSIS
          </span>
        </div>
      </div>
    </div>
  );
}
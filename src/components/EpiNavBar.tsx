import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Project History", to: "/history" },
  { label: "Settings", to: "/settings" },
];

export default function EpiNavBar() {
  const location = useLocation();

  return (
    <header
      className="w-full"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid var(--eg-border)",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between h-14">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "var(--eg-btn-primary)", letterSpacing: "0.18em" }}
          >
            EPI
          </span>
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: "var(--eg-foreground)", fontFamily: "'Work Sans', sans-serif" }}
          >
            GENOME PRO
          </span>
          <span
            className="hidden sm:inline-block text-xs px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: "rgba(27,212,136,0.12)",
              color: "var(--eg-btn-primary)",
              border: "1px solid rgba(27,212,136,0.3)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
            }}
          >
            v2.4.1
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 text-sm transition-colors"
                style={{
                  color: isActive ? "var(--eg-btn-primary)" : "var(--eg-secondary)",
                  borderBottom: isActive ? "2px solid var(--eg-btn-primary)" : "2px solid transparent",
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "'Work Sans', sans-serif",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Session indicator */}
        <div className="hidden md:flex items-center gap-2">
          <span
            className="text-xs font-mono"
            style={{ color: "var(--eg-muted-text)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            SESSION_A3F7
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--eg-accent)" }}
          />
        </div>
      </div>
    </header>
  );
}
export default function BlueprintSketch() {
  return (
    <svg viewBox="0 0 520 360" width="100%" maxWidth="520px" className="block">
      {/* Browser window */}
      <rect
        x="40"
        y="40"
        width="300"
        height="200"
        rx="8"
        stroke="var(--border)"
        strokeWidth="2"
        fill="none"
      />
      {/* 3 browser dots */}
      <circle cx="60" cy="60" r="6" fill="var(--border-soft)" />
      <circle cx="80" cy="60" r="6" fill="var(--border-soft)" />
      <circle cx="100" cy="60" r="6" fill="var(--border-soft)" />
      {/* Content block in browser */}
      <rect
        x="60"
        y="90"
        width="260"
        height="120"
        rx="4"
        stroke="var(--border-soft)"
        strokeWidth="1"
        fill="none"
      />

      {/* Server box */}
      <rect
        x="400"
        y="120"
        width="80"
        height="120"
        rx="8"
        stroke="var(--accent)"
        strokeWidth="2"
        fill="none"
      />

      {/* Arrow */}
      <path
        d="M340 180 L380 180 M370 170 L380 180 L370 190"
        stroke="var(--accent)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dimension lines (React UI) */}
      <line x1="60" y1="260" x2="340" y2="260" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="4 4" />
      <text x="200" y="280" fontFamily="var(--font-mono)" fontSize="14" fill="var(--text-faint)" textAnchor="middle">React UI</text>

      {/* Dimension lines (REST API) */}
      <line x1="440" y1="260" x2="440" y2="280" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="4 4" />
      <text x="440" y="300" fontFamily="var(--font-mono)" fontSize="14" fill="var(--text-faint)" textAnchor="middle">REST API</text>
    </svg>
  );
}

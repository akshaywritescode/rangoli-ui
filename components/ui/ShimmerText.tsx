"use client";

interface ShimmerTextProps {
  text?: string;
  duration?: number;
  base?: string;
  highlight?: string;
  className?: string;
  scale?: number;
  theme?: "light" | "dark";
}

export default function ShimmerText({
  text = "Planning next moves",
  duration = 2000,
  base,
  highlight,
  className = "",
  scale = 1,
  theme = "dark",
}: ShimmerTextProps) {
  // Default colors based on theme
  const defaultBase = theme === "dark" ? "#7c7c7c" : "#a0a0a0";
  const defaultHighlight = theme === "dark" ? "#ffffff" : "#000000";

  const shimmerBase = base || defaultBase;
  const shimmerHighlight = highlight || defaultHighlight;

  return (
    <span
      className={`relative inline-block text-base font-medium ${className}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center",
        // @ts-expect-error CSS custom properties
        "--shimmer-dur": `${duration}ms`,
        "--shimmer-base": shimmerBase,
        "--shimmer-highlight": shimmerHighlight,
        "--shimmer-band": "400%",
        "--shimmer-ease": "linear",
      }}
    >
      <style>{`
        .t-shimmer {
          position: relative;
          display: inline-block;
          color: var(--shimmer-base);
        }
        .t-shimmer::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(
            90deg,
            transparent          0%,
            transparent         40%,
            var(--shimmer-highlight) 50%,
            transparent         60%,
            transparent        100%
          );
          background-size: var(--shimmer-band) 100%;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: t-shimmer var(--shimmer-dur) var(--shimmer-ease) infinite;
        }
        @keyframes t-shimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-shimmer::before { animation: none !important; }
        }
      `}</style>
      <span
        className="t-shimmer"
        data-text={text}
        style={{
          // @ts-expect-error CSS custom properties
          "--shimmer-dur": `${duration}ms`,
          "--shimmer-base": shimmerBase,
          "--shimmer-highlight": shimmerHighlight,
          "--shimmer-band": "400%",
          "--shimmer-ease": "linear",
        }}
      >
        {text}
      </span>
    </span>
  );
}

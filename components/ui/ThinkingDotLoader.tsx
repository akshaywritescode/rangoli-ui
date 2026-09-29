"use client";

import { useEffect, useRef } from "react";

type Variant = "scan" | "twinkle" | "orbit" | "pulse" | "rounded-scan" | "rounded-twinkle";

interface ThinkingDotLoaderProps {
  variant?: Variant;
  cycle?: number;
  base?: string;
  active?: string;
  dotSize?: number;
  gap?: number;
  theme?: "light" | "dark";
  className?: string;
  scale?: number;
}

// Delay tables for each variant (16 dots, row-major order)
function getDelays(variant: Variant, cycle: number): (number | null)[] {
  // Corners [0,3,12,15] are gaps for rounded variants
  const GAPS = new Set([0, 3, 12, 15]);

  switch (variant) {
    case "scan":
    case "rounded-scan": {
      // col * cycle/10
      const delays = Array.from({ length: 16 }, (_, i) => (i % 4) * (cycle / 10));
      if (variant === "rounded-scan") return delays.map((d, i) => (GAPS.has(i) ? null : d));
      return delays;
    }
    case "twinkle":
    case "rounded-twinkle": {
      const order = [7, 2, 11, 5, 14, 9, 0, 12, 3, 15, 6, 10, 13, 1, 8, 4];
      const delays = order.map((rank) => rank * (cycle / 16));
      if (variant === "rounded-twinkle") return delays.map((d, i) => (GAPS.has(i) ? null : d));
      return delays;
    }
    case "orbit": {
      // Ring [1,2,7,11,14,13,8,4] animated, centre [5,6,9,10] steady
      const ring = new Set([1, 2, 7, 11, 14, 13, 8, 4]);
      return Array.from({ length: 16 }, (_, i) => {
        if (!ring.has(i)) return 0; // centre dots hold at base
        const ringOrder = [1, 2, 7, 11, 14, 13, 8, 4];
        return ringOrder.indexOf(i) * (cycle / 8);
      });
    }
    case "pulse": {
      // Inner [5,6,9,10] first, rest cycle*0.16 behind
      const inner = new Set([5, 6, 9, 10]);
      return Array.from({ length: 16 }, (_, i) => (inner.has(i) ? 0 : cycle * 0.16));
    }
    default:
      return Array.from({ length: 16 }, (_, i) => (i % 4) * (cycle / 10));
  }
}

export default function ThinkingDotLoader({
  variant = "scan",
  cycle = 1200,
  base,
  active,
  dotSize = 2,
  gap = 2,
  theme = "dark",
  className = "",
  scale = 1,
}: ThinkingDotLoaderProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const defaultBase = theme === "dark" ? "#3a3a3e" : "#d4d4d8";
  const defaultActive = theme === "dark" ? "#b8b8c2" : "#18181b";
  const resolvedBase = base ?? defaultBase;
  const resolvedActive = active ?? defaultActive;

  const delays = getDelays(variant, cycle);

  const uid = `tm-${variant}`;

  return (
    <div
      className={`inline-block ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <style>{`
        .${uid} {
          display: grid;
          grid-template-columns: repeat(4, ${dotSize}px);
          grid-auto-rows: ${dotSize}px;
          gap: ${gap}px;
        }
        .${uid} i {
          display: block;
          background: ${resolvedBase};
          border-radius: 0;
          animation: t-matrix-pulse-${uid} ${cycle}ms ease-in-out infinite;
        }
        .${uid} i.is-gap {
          visibility: hidden;
          animation: none;
        }
        @keyframes t-matrix-pulse-${uid} {
          0%, 45%, 100% { background-color: ${resolvedBase}; }
          15%            { background-color: ${resolvedActive}; }
        }
        @media (prefers-reduced-motion: reduce) {
          .${uid} i { animation: none !important; }
        }
      `}</style>

      <div ref={gridRef} className={`t-matrix ${uid}`}>
        {delays.map((delay, i) =>
          delay === null ? (
            <i key={i} className="is-gap" />
          ) : (
            <i key={i} style={{ animationDelay: `${delay}ms` }} />
          )
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

interface ThinkingStatesProps {
  states?: string[];
  hold?: number;
  swap?: number;
  distance?: number;
  blur?: number;
  theme?: "light" | "dark";
  className?: string;
  scale?: number;
}

export default function ThinkingStates({
  states = ["Setting up a workplace", "Running a command", "Browsing files"],
  hold = 2000,
  swap = 400,
  distance = 10,
  blur = 4,
  theme = "dark",
  className = "",
  scale = 1,
}: ThinkingStatesProps) {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const base = theme === "dark" ? "#7c7c7c" : "#9ca3af";
  const highlight = theme === "dark" ? "#ffffff" : "#111111";
  const longestState = states.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % states.length);
      setAnimKey(k => k + 1);
    }, hold);
    return () => clearInterval(t);
  }, [hold, states.length]);

  return (
    <span
      className={`relative inline-block text-base font-medium ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <style>{`
        @keyframes think-in {
          from {
            opacity: 0;
            transform: translateY(${distance}px);
            filter: blur(${blur}px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        @keyframes think-shimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }
        .think-shimmer-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            var(--hl) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 400% 100%;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: think-shimmer var(--shimmer-dur) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .think-shimmer-layer { animation: none !important; }
        }
      `}</style>

      {/* Invisible sizer keeps the container width stable */}
      <span style={{ display: "block", visibility: "hidden", whiteSpace: "nowrap" }}>
        {longestState}
      </span>

      {/* The text — re-keyed on every change so it always plays think-in from scratch */}
      <span
        key={animKey}
        role="status"
        aria-live="polite"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          display: "block",
          color: base,
          whiteSpace: "nowrap",
          animation: `think-in ${swap}ms ease-out forwards`,
        }}
      >
        {states[index]}
        <span
          className="think-shimmer-layer"
          aria-hidden="true"
          style={{
            "--hl": highlight,
            "--shimmer-dur": `${hold}ms`,
          } as React.CSSProperties}
        >
          {states[index]}
        </span>
      </span>
    </span>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";

interface ThinkingStatesProps {
  states?: string[];
  hold?: number;
  swap?: number;
  gap?: number;
  distance?: number;
  blur?: number;
  theme?: "light" | "dark";
  className?: string;
  scale?: number;
}

export default function ThinkingStates({
  states = ["Setting up a workplace", "Running a command", "Browsing files"],
  hold = 2000,
  swap = 150,
  gap = 50,
  distance = 8,
  blur = 2,
  theme = "dark",
  className = "",
  scale = 1,
}: ThinkingStatesProps) {
  const [currentText, setCurrentText] = useState(states[0]);
  const [nextText, setNextText] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const base = theme === "dark" ? "#7c7c7c" : "#9ca3af";
  const highlight = theme === "dark" ? "#ffffff" : "#111111";

  // Longest state to size the container
  const longestState = states.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const cycle = () => {
      timerRef.current = setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % states.length;
        const incoming = states[indexRef.current];

        setNextText(incoming);
        setPhase("exiting");

        setTimeout(() => {
          setPhase("entering");
          setTimeout(() => {
            setCurrentText(incoming);
            setNextText(null);
            setPhase("idle");
            cycle();
          }, swap + gap);
        }, gap);
      }, hold);
    };

    cycle();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [states, hold, swap, gap]);

  const textStyle = (isExit: boolean, isEnterStart: boolean): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "block",
    color: base,
    whiteSpace: "nowrap",
    transform: isExit
      ? `translateY(-${distance}px)`
      : isEnterStart
      ? `translateY(${distance}px)`
      : "translateY(0)",
    filter: isExit || isEnterStart ? `blur(${blur}px)` : "blur(0)",
    opacity: isExit || isEnterStart ? 0 : 1,
    transition: isEnterStart
      ? "none"
      : `transform ${swap}ms ease-in-out, filter ${swap}ms ease-in-out, opacity ${swap}ms ease-in-out`,
  });

  return (
    <span
      className={`relative inline-block text-base font-medium ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <style>{`
        .t-think-shimmer-text {
          position: absolute;
          top: 0; left: 0; right: 0;
          pointer-events: none;
          background-image: linear-gradient(
            90deg,
            transparent 0%, transparent 40%,
            var(--t-highlight) 50%,
            transparent 60%, transparent 100%
          );
          background-size: 400% 100%;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: t-think-shimmer var(--t-shimmer-dur) linear infinite;
        }
        @keyframes t-think-shimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-think-shimmer-text { animation: none !important; }
        }
      `}</style>

      {/* Sizer — holds steady width using longest state */}
      <span style={{ display: "block", visibility: "hidden", whiteSpace: "nowrap" }}>
        {longestState}
      </span>

      {/* Current text */}
      <span
        role="status"
        style={{
          ...textStyle(phase === "exiting", false),
          // @ts-expect-error CSS custom properties
          "--t-highlight": highlight,
          "--t-shimmer-dur": `${hold}ms`,
        }}
      >
        {currentText}
        <span
          className="t-think-shimmer-text"
          aria-hidden="true"
          style={{ content: `"${currentText}"` } as React.CSSProperties}
        >
          {currentText}
        </span>
      </span>

      {/* Incoming text */}
      {nextText && (
        <span
          style={{
            ...textStyle(false, phase === "exiting"),
            // @ts-expect-error CSS custom properties
            "--t-highlight": highlight,
            "--t-shimmer-dur": `${hold}ms`,
          }}
        >
          {nextText}
          <span
            className="t-think-shimmer-text"
            aria-hidden="true"
          >
            {nextText}
          </span>
        </span>
      )}
    </span>
  );
}

"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";

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

type SwapPhase = "idle" | "exit" | "enter-prime" | "enter-run";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<SwapPhase>("idle");
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const base = theme === "dark" ? "#7c7c7c" : "#9ca3af";
  const highlight = theme === "dark" ? "#ffffff" : "#111111";
  const longestState = states.reduce((a, b) => (a.length > b.length ? a : b), "");

  // Start the hold timer to trigger next swap
  const scheduleNext = () => {
    holdTimerRef.current = setTimeout(() => {
      setNextIndex((prev) => {
        const next = (currentIndex + 1) % states.length;
        return next;
      });
      setPhase("exit");
    }, hold);
  };

  // Kick off on mount and whenever currentIndex settles back to idle
  useEffect(() => {
    if (phase === "idle") {
      scheduleNext();
    }
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, [phase, currentIndex]);

  // When phase hits "exit", wait gap ms then move to "enter-prime"
  // enter-prime renders the incoming span off-screen (no transition)
  useEffect(() => {
    if (phase === "exit") {
      swapTimerRef.current = setTimeout(() => {
        setPhase("enter-prime");
      }, gap);
    }
    return () => { if (swapTimerRef.current) clearTimeout(swapTimerRef.current); };
  }, [phase]);

  // After "enter-prime" paints, force a reflow then release to "enter-run"
  useLayoutEffect(() => {
    if (phase === "enter-prime") {
      // Reading offsetHeight forces the browser to flush layout,
      // so the next setState sees the resting position before animating.
      void document.body.offsetHeight;
      setPhase("enter-run");
    }
  }, [phase]);

  // After the swap animation finishes, commit the new state
  useEffect(() => {
    if (phase === "enter-run") {
      swapTimerRef.current = setTimeout(() => {
        if (nextIndex !== null) setCurrentIndex(nextIndex);
        setNextIndex(null);
        setPhase("idle");
      }, swap);
    }
    return () => { if (swapTimerRef.current) clearTimeout(swapTimerRef.current); };
  }, [phase]);

  const transition = `transform ${swap}ms ease-in-out, filter ${swap}ms ease-in-out, opacity ${swap}ms ease-in-out`;

  // Styles for the outgoing (current) span
  const currentStyle: React.CSSProperties =
    phase === "exit" || phase === "enter-prime" || phase === "enter-run"
      ? {
          transform: `translateY(-${distance}px)`,
          filter: `blur(${blur}px)`,
          opacity: 0,
          transition,
        }
      : {
          transform: "translateY(0)",
          filter: "blur(0)",
          opacity: 1,
          transition,
        };

  // Styles for the incoming span
  const nextStylePrime: React.CSSProperties = {
    transform: `translateY(${distance}px)`,
    filter: `blur(${blur}px)`,
    opacity: 0,
    transition: "none", // no transition while priming position
  };

  const nextStyleRun: React.CSSProperties = {
    transform: "translateY(0)",
    filter: "blur(0)",
    opacity: 1,
    transition,
  };

  const spanBase: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "block",
    color: base,
    whiteSpace: "nowrap",
  };

  return (
    <span
      className={`relative inline-block text-base font-medium ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <style>{`
        .t-think-shimmer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(
            90deg,
            transparent 0%, transparent 40%,
            var(--thi-hl) 50%,
            transparent 60%, transparent 100%
          );
          background-size: 400% 100%;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: t-think-shimmer-kf var(--thi-dur) linear infinite;
        }
        @keyframes t-think-shimmer-kf {
          0%   { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-think-shimmer { animation: none !important; }
        }
      `}</style>

      {/* Invisible sizer — keeps the container width stable */}
      <span style={{ display: "block", visibility: "hidden", whiteSpace: "nowrap" }}>
        {longestState}
      </span>

      {/* Current (outgoing) text */}
      <span
        role="status"
        aria-live="polite"
        style={{ ...spanBase, ...currentStyle }}
      >
        {states[currentIndex]}
        <span
          className="t-think-shimmer"
          aria-hidden="true"
          style={{ "--thi-hl": highlight, "--thi-dur": `${hold}ms` } as React.CSSProperties}
        >
          {states[currentIndex]}
        </span>
      </span>

      {/* Incoming text — only rendered during swap */}
      {nextIndex !== null && (
        <span
          style={{
            ...spanBase,
            ...(phase === "enter-run" ? nextStyleRun : nextStylePrime),
          }}
        >
          {states[nextIndex]}
          <span
            className="t-think-shimmer"
            aria-hidden="true"
            style={{ "--thi-hl": highlight, "--thi-dur": `${hold}ms` } as React.CSSProperties}
          >
            {states[nextIndex]}
          </span>
        </span>
      )}
    </span>
  );
}

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

type Phase = "idle" | "exit" | "enter-prime" | "enter-run";

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
  const [curIdx, setCurIdx] = useState(0);
  const [nxtIdx, setNxtIdx] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  // Stable refs so timers never close over stale values
  const curIdxRef = useRef(0);
  const statesRef = useRef(states);
  statesRef.current = states;

  const base = theme === "dark" ? "#7c7c7c" : "#9ca3af";
  const highlight = theme === "dark" ? "#ffffff" : "#111111";
  const longestState = states.reduce((a, b) => (a.length > b.length ? a : b), "");

  // Single loop — runs once, self-cleans
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    const kick = () => {
      // 1. Wait hold ms, then start exit
      t = setTimeout(() => {
        const next = (curIdxRef.current + 1) % statesRef.current.length;
        setNxtIdx(next);
        setPhase("exit");

        // 2. After gap ms, mount incoming span in its "primed" (offset) position
        t = setTimeout(() => {
          setPhase("enter-prime");
          // useLayoutEffect will flip this to "enter-run" after paint
        }, gap);
      }, hold);
    };

    kick();
    return () => clearTimeout(t);
    // intentionally empty deps — runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After enter-prime paints, force reflow then release the animation
  useLayoutEffect(() => {
    if (phase !== "enter-prime") return;
    void document.body.offsetHeight; // flush layout
    setPhase("enter-run");
  }, [phase]);

  // After enter-run animation finishes, commit and loop
  useEffect(() => {
    if (phase !== "enter-run") return;
    const t = setTimeout(() => {
      if (nxtIdx === null) return;
      curIdxRef.current = nxtIdx;
      setCurIdx(nxtIdx);
      setNxtIdx(null);
      setPhase("idle");
    }, swap);
    return () => clearTimeout(t);
  }, [phase, nxtIdx, swap]);

  // Restart hold timer each time we return to idle
  useEffect(() => {
    if (phase !== "idle") return;
    const t = setTimeout(() => {
      const next = (curIdxRef.current + 1) % statesRef.current.length;
      setNxtIdx(next);
      setPhase("exit");

      setTimeout(() => {
        setPhase("enter-prime");
      }, gap);
    }, hold);
    return () => clearTimeout(t);
  }, [phase, hold, gap]);

  const transition = `transform ${swap}ms ease-in-out, filter ${swap}ms ease-in-out, opacity ${swap}ms ease-in-out`;

  const curStyle: React.CSSProperties =
    phase === "exit" || phase === "enter-prime" || phase === "enter-run"
      ? { transform: `translateY(-${distance}px)`, filter: `blur(${blur}px)`, opacity: 0, transition }
      : { transform: "translateY(0)", filter: "blur(0px)", opacity: 1, transition };

  const nxtStyle: React.CSSProperties =
    phase === "enter-run"
      ? { transform: "translateY(0)", filter: "blur(0px)", opacity: 1, transition }
      : { transform: `translateY(${distance}px)`, filter: `blur(${blur}px)`, opacity: 0, transition: "none" };

  const spanBase: React.CSSProperties = {
    position: "absolute",
    top: 0, left: 0, right: 0,
    display: "block",
    color: base,
    whiteSpace: "nowrap",
  };

  const shimmerVars = {
    "--thi-hl": highlight,
    "--thi-dur": `${hold}ms`,
  } as React.CSSProperties;

  return (
    <span
      className={`relative inline-block text-base font-medium ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <style>{`
        .t-think-shimmer {
          position: absolute; inset: 0;
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
          animation: t-think-kf var(--thi-dur) linear infinite;
        }
        @keyframes t-think-kf {
          0%   { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-think-shimmer { animation: none !important; }
        }
      `}</style>

      {/* Invisible sizer keeps container width stable */}
      <span style={{ display: "block", visibility: "hidden", whiteSpace: "nowrap" }}>
        {longestState}
      </span>

      {/* Outgoing text */}
      <span role="status" aria-live="polite" style={{ ...spanBase, ...curStyle }}>
        {states[curIdx]}
        <span className="t-think-shimmer" aria-hidden="true" style={shimmerVars}>
          {states[curIdx]}
        </span>
      </span>

      {/* Incoming text — only during swap */}
      {nxtIdx !== null && (
        <span style={{ ...spanBase, ...nxtStyle }}>
          {states[nxtIdx]}
          <span className="t-think-shimmer" aria-hidden="true" style={shimmerVars}>
            {states[nxtIdx]}
          </span>
        </span>
      )}
    </span>
  );
}

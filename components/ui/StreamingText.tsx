"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface StreamingTextProps {
  text?: string;
  gap?: number;
  fade?: number;
  blur?: number;
  autoPlay?: boolean;
  loop?: boolean;
  loopDelay?: number;
  theme?: "light" | "dark";
  className?: string;
  scale?: number;
}

export default function StreamingText({
  text = "Words resolve through a soft cross-blur as they stream in one by one from the model.",
  gap = 60,
  fade = 350,
  blur = 1,
  autoPlay = true,
  loop = true,
  loopDelay = 1500,
  theme = "dark",
  className = "",
  scale = 1,
}: StreamingTextProps) {
  const words = text.trim().split(/\s+/);
  const [visible, setVisible] = useState<boolean[]>(words.map(() => false));
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const textColor = theme === "dark" ? "#e4e4e7" : "#18181b";

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const stream = useCallback(() => {
    clearTimers();

    // Snap all words invisible instantly
    setVisible(words.map(() => false));

    // One tick later, start resolving words in order
    const t0 = setTimeout(() => {
      words.forEach((_, i) => {
        const t = setTimeout(() => {
          setVisible(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * gap);
        timersRef.current.push(t);
      });
    }, 16); // one frame to let the snap paint

    timersRef.current.push(t0);
  }, [words.length, gap]);

  // Auto-play on mount
  useEffect(() => {
    if (!autoPlay) return;
    stream();
    return clearTimers;
  }, [text]);

  // Loop
  useEffect(() => {
    if (!loop || !autoPlay) return;
    const totalDuration = words.length * gap + fade + loopDelay;
    const t = setInterval(() => stream(), totalDuration);
    return () => clearInterval(t);
  }, [text, gap, fade, loopDelay, loop, autoPlay]);

  return (
    <span
      className={`relative inline ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center", display: "inline-block", fontSize: "0.875rem", lineHeight: "1.75" }}
    >
      <style>{`
        .stream-word {
          display: inline;
          opacity: 0;
          filter: blur(var(--sw-blur));
          transition:
            opacity var(--sw-fade) cubic-bezier(0.22, 1, 0.36, 1),
            filter  var(--sw-fade) cubic-bezier(0.22, 1, 0.36, 1);
        }
        .stream-word.is-in {
          opacity: 1;
          filter: blur(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .stream-word {
            transition: none !important;
            filter: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {words.map((word, i) => (
        <span key={i}>
          <span
            className={`stream-word${visible[i] ? " is-in" : ""}`}
            style={{
              "--sw-blur": `${blur}px`,
              "--sw-fade": `${fade}ms`,
              color: textColor,
            } as React.CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

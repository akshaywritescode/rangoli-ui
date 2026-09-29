"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";

type FeedbackState = "idle" | "helpful" | "not-helpful" | "closed";

interface FeedbackBarProps {
  title?: string;
  icon?: React.ReactNode;
  onHelpful?: () => void;
  onNotHelpful?: () => void;
  onClose?: () => void;
  theme?: "light" | "dark";
  className?: string;
  scale?: number;
}

export default function FeedbackBar({
  title = "Was this response helpful?",
  icon,
  onHelpful,
  onNotHelpful,
  onClose,
  theme = "dark",
  className = "",
  scale = 1,
}: FeedbackBarProps) {
  const [feedback, setFeedback] = useState<FeedbackState>("idle");

  const handleHelpful = () => {
    setFeedback("helpful");
    onHelpful?.();
  };

  const handleNotHelpful = () => {
    setFeedback("not-helpful");
    onNotHelpful?.();
  };

  const handleClose = () => {
    setFeedback("closed");
    onClose?.();
    // Reset after a short delay so preview loops nicely
    setTimeout(() => setFeedback("idle"), 1200);
  };

  if (feedback === "closed") return null;

  const isDark = theme === "dark";
  const bg = isDark ? "bg-zinc-900" : "bg-white";
  const border = isDark ? "border-white/10" : "border-zinc-200";
  const text = isDark ? "text-white" : "text-zinc-900";
  const muted = isDark ? "text-zinc-500" : "text-zinc-400";
  const hoverText = isDark ? "hover:text-white" : "hover:text-zinc-900";
  const hoverBg = isDark ? "hover:bg-white/5" : "hover:bg-zinc-100";
  const divider = isDark ? "border-white/10" : "border-zinc-200";

  const activeHelpful = feedback === "helpful";
  const activeNotHelpful = feedback === "not-helpful";

  return (
    <div
      className={`inline-flex rounded-xl border text-sm ${bg} ${border} ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <div className="flex w-full items-center justify-between">
        {/* Title */}
        <div className="flex flex-1 items-center gap-3 py-3 pl-4">
          {icon && <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>{icon}</span>}
          <span className={`font-medium ${text}`}>{title}</span>
        </div>

        {/* Thumbs */}
        <div className="flex items-center gap-0.5 px-3 py-0">
          <button
            type="button"
            onClick={handleHelpful}
            aria-label="Helpful"
            aria-pressed={activeHelpful}
            className={`flex size-8 items-center justify-center rounded-md transition-colors ${hoverBg} ${
              activeHelpful
                ? "text-emerald-400"
                : `${muted} ${hoverText}`
            }`}
          >
            <ThumbsUp className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleNotHelpful}
            aria-label="Not helpful"
            aria-pressed={activeNotHelpful}
            className={`flex size-8 items-center justify-center rounded-md transition-colors ${hoverBg} ${
              activeNotHelpful
                ? "text-rose-400"
                : `${muted} ${hoverText}`
            }`}
          >
            <ThumbsDown className="size-4" />
          </button>
        </div>

        {/* Close */}
        <div className={`flex items-center justify-center border-l ${divider}`}>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className={`flex items-center justify-center rounded-md p-3 transition-colors ${muted} ${hoverText} ${hoverBg}`}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

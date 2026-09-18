"use client";

import { useState, useEffect } from "react";
import { Check, X, RotateCcw, Trash2 } from "lucide-react";

interface InlineConfirmProps {
  corner?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  onUndo?: () => void;
  label?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  undoLabel?: string;
  undoTimeout?: number;
  theme?: "light" | "dark";
  className?: string;
  scale?: number;
}

type Phase = "idle" | "asking" | "done";

export default function InlineConfirmBtn({
  corner = 20,
  onConfirm,
  onCancel,
  onUndo,
  label = "Delete",
  confirmLabel = "Yes",
  cancelLabel = "No",
  undoLabel = "Undo",
  undoTimeout = 3000,
  theme = "dark",
  className = "",
  scale = 1,
}: InlineConfirmProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (phase === "done") {
      const timer = setTimeout(() => {
        setPhase("idle");
      }, undoTimeout);

      return () => clearTimeout(timer);
    }
  }, [phase, undoTimeout]);

  const handleInitialClick = () => {
    setPhase("asking");
  };

  const handleConfirm = () => {
    setPhase("done");
    setIsAnimating(true);
    onConfirm?.();
    setTimeout(() => setIsAnimating(false), 340);
  };

  const handleCancel = () => {
    setPhase("idle");
    onCancel?.();
  };

  const handleUndo = () => {
    setPhase("idle");
    onUndo?.();
  };

  // Theme-based colors
  const bgColor = theme === "light" ? "bg-white" : "bg-zinc-900";
  const textColor = theme === "light" ? "text-zinc-900" : "text-white";
  const borderColor = theme === "light" ? "border-zinc-200" : "border-white/10";
  const hoverBg = theme === "light" ? "hover:bg-zinc-100" : "hover:bg-white/5";
  const dividerColor = theme === "light" ? "border-zinc-200" : "border-white/20";
  const timerBg = theme === "light" ? "bg-zinc-300" : "bg-white/30";

  return (
    <div
      className={`inline-block ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <div
        className={`shell relative overflow-hidden ${bgColor} ${textColor} border ${borderColor} font-medium shadow-lg hover:shadow-xl transition-all`}
        data-phase={phase}
        style={{
          borderRadius: `${corner}px`,
        }}
      >
        {/* Idle State */}
        {phase === "idle" && (
          <button
            onClick={handleInitialClick}
            className={`w-full h-full px-4 py-2 flex items-center justify-center gap-1.5 transition-all ${hoverBg} text-sm`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        )}

        {/* Asking State */}
        {phase === "asking" && (
          <div className="flex items-center h-full text-sm">
            <button
              onClick={handleConfirm}
              className={`flex-1 px-3 py-2 flex items-center justify-center gap-1.5 transition-colors border-r ${dividerColor} ${hoverBg}`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{confirmLabel}</span>
            </button>
            <button
              onClick={handleCancel}
              className={`flex-1 px-3 py-2 flex items-center justify-center gap-1.5 transition-colors ${hoverBg}`}
            >
              <X className="w-3.5 h-3.5" />
              <span>{cancelLabel}</span>
            </button>
          </div>
        )}

        {/* Done State with Undo */}
        {phase === "done" && (
          <div className="relative h-full">
            <button
              onClick={handleUndo}
              className={`w-full h-full px-4 py-2 flex items-center justify-center gap-1.5 transition-colors ${hoverBg} text-sm`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{undoLabel}</span>
            </button>
            
            {/* Burn-down timer bar - thin line */}
            <div
              className={`absolute bottom-0 left-0 h-[2px] ${timerBg}`}
              style={{
                animation: `burn ${undoTimeout}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .shell {
          transition: width 340ms cubic-bezier(0.24, 1.34, 0.38, 1);
        }

        .shell[data-phase="idle"] {
          width: 120px;
        }

        .shell[data-phase="asking"] {
          width: 180px;
        }

        .shell[data-phase="done"] {
          width: 160px;
        }

        @keyframes burn {
          from {
            width: 100%;
          }
          to {
            width: 0;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface Task {
  id: string;
  label: string;
  done: boolean;
}

interface AITaskTrackerProps {
  title?: string;
  tasks?: Task[];
  shimmerDuration?: number;
  theme?: "light" | "dark";
  className?: string;
  scale?: number;
}

const DEFAULT_TASKS: Task[] = [
  { id: "1", label: "Scaffold the project structure", done: true },
  { id: "2", label: "Build the component registry", done: true },
  { id: "3", label: "Implement entitlement gating", done: false },
  { id: "4", label: "Wire up Stripe checkout", done: false },
  { id: "5", label: "Polish the landing page", done: false },
];

export default function AITaskTracker({
  title = "Working on it",
  tasks: initialTasks = DEFAULT_TASKS,
  shimmerDuration = 2000,
  theme = "light",
  className = "",
  scale = 1,
}: AITaskTrackerProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const doneCount = tasks.filter(t => t.done).length;
  const allDone = doneCount === tasks.length;

  // The first undone task is the "current" one
  const currentTaskId = tasks.find(t => !t.done)?.id ?? null;

  const isDark = theme === "dark";

  const cardBg = isDark ? "bg-zinc-900" : "bg-white";
  const cardBorder = isDark ? "border-white/10" : "border-zinc-200";
  const counterColor = isDark ? "text-zinc-500" : "text-zinc-400";
  const taskDoneText = isDark ? "text-zinc-600" : "text-zinc-400";
  const taskPendingText = isDark ? "text-zinc-600" : "text-zinc-400";
  const iconDone = isDark ? "text-zinc-700" : "text-zinc-300";
  const iconCurrent = isDark ? "text-zinc-400" : "text-zinc-400";
  const iconPending = isDark ? "text-zinc-700" : "text-zinc-300";
  const divider = isDark ? "border-white/5" : "border-zinc-100";

  // Shimmer colours
  const shimmerBase = isDark ? "#71717a" : "#52525b";
  const shimmerHighlight = isDark ? "#ffffff" : "#000000";

  return (
    <div
      className={`w-full ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <style>{`
        @keyframes ait-shimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }
        .ait-shimmer-text {
          position: relative;
          display: inline;
          color: ${shimmerBase};
        }
        .ait-shimmer-text::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(
            90deg,
            transparent 0%,
            transparent 38%,
            ${shimmerHighlight} 50%,
            transparent 62%,
            transparent 100%
          );
          background-size: 300% 100%;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: ait-shimmer ${shimmerDuration}ms linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ait-shimmer-text::before { animation: none !important; }
        }
      `}</style>

      <div
        className={`rounded-2xl border ${cardBg} ${cardBorder} overflow-hidden`}
        style={{ boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 2px 16px rgba(0,0,0,0.06)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <span className={`text-xs font-medium uppercase tracking-widest ${counterColor}`}>{title}</span>
          <span className={`text-xs font-medium tabular-nums ${counterColor}`}>
            {doneCount}/{tasks.length}
          </span>
        </div>

        {/* Divider */}
        <div className={`border-t ${divider}`} />

        {/* Task list */}
        <ul className="px-5 py-3 space-y-0">
          {tasks.map((task, i) => {
            const isCurrent = task.id === currentTaskId;
            const isPending = !task.done && !isCurrent;

            return (
              <li key={task.id}>
                <button
                  onClick={() => toggleTask(task.id)}
                  className="w-full flex items-center gap-3 py-3 text-left group"
                >
                  {/* Icon */}
                  {task.done ? (
                    <CheckCircle2
                      className={`w-[18px] h-[18px] flex-shrink-0 ${iconDone}`}
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Circle
                      className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                        isCurrent ? iconCurrent : iconPending
                      } group-hover:text-emerald-500`}
                      strokeWidth={1.5}
                    />
                  )}

                  {/* Label */}
                  {task.done ? (
                    <span className={`text-sm line-through ${taskDoneText}`}>
                      {task.label}
                    </span>
                  ) : isCurrent ? (
                    <span
                      className="ait-shimmer-text text-sm"
                      data-text={task.label}
                    >
                      {task.label}
                    </span>
                  ) : (
                    <span className={`text-sm opacity-40 ${taskPendingText}`}>
                      {task.label}
                    </span>
                  )}
                </button>

                {i < tasks.length - 1 && (
                  <div className={`border-t ${divider} ml-7`} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

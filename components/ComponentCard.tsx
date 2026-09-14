import Link from "next/link";
import { Component } from "@/lib/components";
import { ComponentPreview } from "./ComponentPreview";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Link
      href={`/component/${component.id}`}
      className="group block relative"
    >
      <div className="relative bg-zinc-950/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-300 group-hover:-translate-y-1">
        {/* Preview */}
        <div className="bg-zinc-900/80 rounded-xl p-10 mb-4 min-h-[280px] flex items-center justify-center border border-white/5">
          <ComponentPreview component={component} />
        </div>

        {/* Info */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-base font-bold mb-2 font-space-grotesk">
              {component.name}
            </h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-inter">
              {component.description}
            </p>
          </div>
          
          {/* Copy Icon */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // TODO: Copy AI prompt functionality
            }}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Copy AI prompt"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-400 group-hover:text-zinc-300 transition-colors"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}

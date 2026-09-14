"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { components } from "@/lib/components";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(query.toLowerCase()) ||
    component.description.toLowerCase().includes(query.toLowerCase()) ||
    component.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (id: string) => {
    router.push(`/component/${id}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="hidden md:flex items-center gap-3 w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 group"
      >
        <svg className="w-4 h-4 text-zinc-400 group-hover:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-sm text-zinc-400 group-hover:text-zinc-300">Search...</span>
        <kbd className="ml-auto hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-zinc-500">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Mobile Search Icon */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
            }}
          />

          {/* Search Panel */}
          <div className="relative w-full max-w-2xl bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className={`flex items-center gap-3 px-5 py-4 border-b transition-colors ${focused ? 'border-pink-500/30' : 'border-white/5'}`}>
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search components..."
                className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query === "" ? (
                <div className="p-8 text-center">
                  <div className="mb-4 text-5xl">🔍</div>
                  <p className="text-zinc-400 text-sm">Start typing to search components</p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-600">
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">Enter</kbd>
                      Select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">Esc</kbd>
                      Close
                    </span>
                  </div>
                </div>
              ) : filteredComponents.length > 0 ? (
                <div className="p-2">
                  {filteredComponents.map((component) => (
                    <button
                      key={component.id}
                      onClick={() => handleSelect(component.id)}
                      className="w-full flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-pink-500/30 transition-colors">
                        <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white mb-1 group-hover:text-pink-400 transition-colors">
                          {component.name}
                        </h3>
                        <p className="text-sm text-zinc-500 line-clamp-1">
                          {component.description}
                        </p>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 bg-pink-500/10 border border-pink-500/20 rounded text-xs text-pink-400">
                            {component.category}
                          </span>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="mb-4 text-5xl">😕</div>
                  <p className="text-zinc-400 text-sm">No components found for "{query}"</p>
                  <p className="text-zinc-600 text-xs mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

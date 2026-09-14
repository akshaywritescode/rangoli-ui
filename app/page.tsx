"use client";

import { useState } from "react";
import Link from "next/link";
import { components } from "@/lib/components";
import ComponentCard from "@/components/ComponentCard";
import { RangoliLogo } from "@/components/RangoliLogo";
import dynamic from "next/dynamic";

const Dither = dynamic(() => import("@/components/Dither"), { ssr: false });

const categories = ["All", "Buttons", "Cards", "Forms", "Navigation", "Effects"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredComponents = activeFilter === "All" 
    ? components 
    : components.filter(c => c.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden h-[600px] flex items-center justify-center">
        {/* Dither Background */}
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'auto' }}>
          <Dither
            waveColor={[0.5, 0.5, 0.5]}
            backgroundColor={[0, 0, 0]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
            pixelSize={2}
          />
        </div>
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-[1] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10 pointer-events-none">
          <div className="mb-4 inline-block">
            <RangoliLogo size={180} />
          </div>
          
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm pointer-events-auto">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-zinc-300">New component every week</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-space-grotesk">
            <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
              Beautiful UI
            </span>
            <br />
            <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
              Components
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-inter leading-relaxed drop-shadow-lg">
            A curated collection of interactive components.
          </p>
        </div>
      </section>

      {/* Components Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3 font-space-grotesk">All Components</h2>
            <p className="text-zinc-500">Click on any component to view details, code, and usage examples.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 whitespace-nowrap ${
                  activeFilter === category
                    ? "bg-white text-black"
                    : "bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300 border border-zinc-800/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">No components found in this category yet.</p>
              <p className="text-zinc-600 text-sm mt-2">Check back soon for new components!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

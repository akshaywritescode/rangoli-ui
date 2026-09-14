"use client";

import { useState } from "react";
import { Component } from "@/lib/components";
import { ComponentPreview } from "./ComponentPreview";
import { CodeBlock } from "./CodeBlock";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ComponentTabsProps {
  component: Component;
}

export function ComponentTabs({ component }: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "setup" | "code">(
    "preview"
  );

  const tabs = [
    { id: "preview", label: "Preview" },
    { id: "setup", label: "Setup" },
    { id: "code", label: "Code" },
  ] as const;

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-2 border-b border-white/5 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3.5 text-base font-semibold transition-all duration-200 border-b-2 font-space-grotesk ${
              activeTab === tab.id
                ? "border-pink-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "preview" && (
          <div className="relative">
            <div className="relative bg-zinc-950/50 backdrop-blur-sm border border-white/10 rounded-2xl p-16 min-h-[400px] flex items-center justify-center">
              <ComponentPreview component={component} />
            </div>
          </div>
        )}

        {activeTab === "setup" && (
          <div className="bg-zinc-950/50 backdrop-blur-sm border border-white/5 rounded-2xl p-10">
            <div className="max-w-3xl">
              {component.hasReactComponent ? (
                // React Component Setup
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Create the component file</h3>
                    <p className="text-zinc-400">
                      Copy the code from the Code tab and save it as <code className="px-2 py-1 bg-black/50 rounded text-pink-400 font-jetbrains-mono text-sm">
                        {component.id === 'animated-qr-code' ? 'components/ui/AnimatedQRCode.tsx' : component.id === 'event-ticket' ? 'components/ui/EventTicket.tsx' : 'components/ui/MusicPlayer.tsx'}
                      </code>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">Import and use</h3>
                    <div className="bg-black/50 border border-white/10 rounded-lg overflow-hidden">
                      <SyntaxHighlighter
                        language="typescript"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          background: 'transparent',
                          fontSize: '0.875rem',
                        }}
                      >
                        {component.id === 'animated-qr-code' 
                          ? `import AnimatedQRCode from "@/components/ui/AnimatedQRCode";`
                          : component.id === 'event-ticket'
                          ? `import EventTicket from "@/components/ui/EventTicket";`
                          : `import MusicPlayer from "@/components/ui/MusicPlayer";`
                        }
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">Add to your JSX</h3>
                    <div className="bg-black/50 border border-white/10 rounded-lg overflow-hidden">
                      <SyntaxHighlighter
                        language="tsx"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          background: 'transparent',
                          fontSize: '0.875rem',
                        }}
                      >
{component.id === 'animated-qr-code' 
  ? `<AnimatedQRCode 
  data="https://yourwebsite.com" 
  size={300}
  animationDuration={1.5}
  dotColor="#000000"
/>`
  : component.id === 'event-ticket'
  ? `<EventTicket
  eventName="INIT Conference"
  eventDate="August 31 - September 4"
  holderName="John Doe"
  holderRole="Appwrite developer"
  ticketId="INIT-7440B2"
  eventLogo="/event-logo.png"
  backgroundImage="/event-bg.jpg"
/>`
  : `<MusicPlayer 
  coverImage="/path/to/cover.jpg" 
  audioSrc="/path/to/audio.mp3"
  songName="Song Title"
  artistName="Artist Name"
/>`}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Add required assets</h3>
                    <p className="text-zinc-400">
                      {component.id === 'animated-qr-code' 
                        ? 'No additional assets required - component uses QR Server API'
                        : component.id === 'event-ticket'
                        ? 'Optional: Add event logo and background images to your public folder'
                        : <>Place <code className="px-2 py-1 bg-black/50 rounded text-pink-400 font-jetbrains-mono text-sm">play-icon.svg</code> and <code className="px-2 py-1 bg-black/50 rounded text-pink-400 font-jetbrains-mono text-sm">pause-icon.svg</code> in your public folder</>
                      }
                    </p>
                  </div>
                </div>
              ) : (
                // HTML/CSS Component Setup
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Copy the code</h3>
                    <p className="text-zinc-400">
                      Copy the HTML and CSS code from the Code tab
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">Add to your HTML</h3>
                    <div className="bg-black/50 border border-white/10 rounded-lg overflow-hidden">
                      <SyntaxHighlighter
                        language="html"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          background: 'transparent',
                          fontSize: '0.875rem',
                        }}
                      >
                        {component.html.split('\n')[0]}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Add the styles</h3>
                    <p className="text-zinc-400">
                      Copy the CSS to your stylesheet
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="space-y-6">
            <CodeBlock code={component.html} language="typescript" title="Component Code" />
            {component.css && (
              <CodeBlock code={component.css} language="css" title="CSS" />
            )}
            {component.js && (
              <CodeBlock
                code={component.js}
                language="javascript"
                title="JavaScript"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

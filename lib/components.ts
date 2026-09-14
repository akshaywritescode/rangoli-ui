export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  date: string;
  html: string;
  css: string;
  js?: string;
  usage: string;
  hasReactComponent?: boolean;
  reactComponentPath?: string;
}

export const components: Component[] = [
  {
    id: "event-ticket",
    name: "Event Ticket",
    description: "Modern event ticket with perforated edge and gradient design",
    category: "Cards",
    date: "2026-09-14",
    hasReactComponent: true,
    reactComponentPath: "@/components/ui/EventTicket",
    html: `"use client";

interface EventTicketProps {
  eventName: string;
  eventDate: string;
  holderName: string;
  holderRole: string;
  ticketId: string;
  eventLogo?: string;
}

export default function EventTicket({
  eventName,
  eventDate,
  holderName,
  holderRole,
  ticketId,
  eventLogo,
}: EventTicketProps) {
  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden border border-white/10">
        <div className="flex">
          <div className="flex-1 p-8 relative z-10">
            {eventLogo && (
              <div className="mb-6">
                <img src={eventLogo} alt="Event Logo" className="h-8 object-contain" />
              </div>
            )}

            <div className="text-zinc-400 text-sm font-medium mb-8 uppercase tracking-wider">
              {eventDate}
            </div>

            <div className="border-t border-dashed border-white/10 mb-8"></div>

            <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 font-space-grotesk">
              {holderName}
            </h3>

            <p className="text-zinc-400 text-lg mb-8 font-inter">{holderRole}</p>

            <div className="space-y-2">
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Event Pass</div>
              <div className="text-pink-500 font-mono text-sm font-semibold">#{ticketId}</div>
            </div>
          </div>

          <div className="relative w-0">
            {/* Semi-circles cutting through */}
            <div className="absolute top-0 bottom-0 -left-2 w-4 flex flex-col justify-around z-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-black" />
              ))}
            </div>
            {/* Dashed line behind semi-circles */}
            <div className="absolute top-0 bottom-0 left-0 w-px border-l-2 border-dashed border-white/20 z-10"></div>
          </div>

          <div className="w-64 relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
            <div className="relative z-10 h-full flex flex-col items-center justify-between">
              <div className="text-center">
                <span className="text-zinc-500 text-xs uppercase tracking-widest">{eventDate}</span>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-1 h-32 items-end">
                  {[4, 8, 3, 6, 9, 4, 7, 5, 8, 3, 6, 4, 7, 9, 5, 6, 3, 8, 4, 7].map((height, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-sm"
                      style={{ width: '3px', height: \`\${height * 10}%\` }}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <div className="text-pink-500 font-mono text-xs font-bold tracking-wider">
                    {ticketId}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-white/40 text-xs uppercase tracking-[0.2em] font-semibold">
                  {eventName}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border border-white/10"></div>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border border-white/10"></div>
      </div>
    </div>
  );
}`,
    css: `// All styles are built into the component using Tailwind CSS`,
    usage: `## Usage

A modern event ticket component with perforated edge design, perfect for conferences, concerts, and events.

### Installation

1. Copy the component code to your project: \`components/ui/EventTicket.tsx\`

### Usage Example

\`\`\`tsx
import EventTicket from "@/components/ui/EventTicket";

export default function MyPage() {
  return (
    <EventTicket
      eventName="INIT Conference"
      eventDate="August 31 - September 4"
      holderName="John Doe"
      holderRole="Appwrite developer"
      ticketId="INIT-7440B2"
      eventLogo="/event-logo.png"
    />
  );
}
\`\`\`

### Props

- \`eventName\` (string, required): Name of the event
- \`eventDate\` (string, required): Event date range or specific date
- \`holderName\` (string, required): Name of ticket holder
- \`holderRole\` (string, required): Role or ticket type description
- \`ticketId\` (string, required): Unique ticket identifier
- \`eventLogo\` (string, optional): URL to event logo image

### Features

- Modern perforated tear-off edge design
- Semi-circles cutting through dashed line
- Barcode-style right side
- Responsive layout
- Pink accent colors
- Ticket ID with pink highlight
- Clean, professional appearance
- Top and bottom notches for authentic ticket feel`,
  },
  {
    id: "animated-qr-code",
    name: "Animated QR Code",
    description: "QR code that comes to life with animated dots",
    category: "Effects",
    date: "2026-09-14",
    hasReactComponent: true,
    reactComponentPath: "@/components/ui/AnimatedQRCode",
    html: `"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedQRCodeProps {
  data: string;
  size?: number;
  animationDuration?: number;
  dotColor?: string;
}

export default function AnimatedQRCode({ 
  data, 
  size = 300,
  animationDuration = 0.8,
  dotColor = "#000000"
}: AnimatedQRCodeProps) {
  const [qrData, setQrData] = useState<string>("");
  const [dots, setDots] = useState<{ x: number; y: number; delay: number; active: boolean }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const qrUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=\${size}x\${size}&data=\${encodeURIComponent(data)}&format=png\`;
    setQrData(qrUrl);
  }, [data, size]);

  useEffect(() => {
    if (!qrData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = qrData;

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size);
      const moduleSize = size / 33;
      const newDots: { x: number; y: number; delay: number; active: boolean }[] = [];

      for (let row = 0; row < 33; row++) {
        for (let col = 0; col < 33; col++) {
          const x = Math.floor(col * moduleSize + moduleSize / 2);
          const y = Math.floor(row * moduleSize + moduleSize / 2);
          const index = (y * size + x) * 4;
          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];
          
          if (r < 128 && g < 128 && b < 128) {
            newDots.push({
              x: col * moduleSize + moduleSize / 2,
              y: row * moduleSize + moduleSize / 2,
              delay: Math.random() * animationDuration,
              active: false,
            });
          }
        }
      }

      setDots(newDots);

      setTimeout(() => {
        setDots(prev => prev.map(dot => ({ ...dot, active: true })));
      }, 100);
    };
  }, [qrData, size, animationDuration]);

  return (
    <div className="relative inline-block">
      <canvas ref={canvasRef} className="hidden" />
      
      <div 
        className="relative bg-white rounded-2xl p-4"
        style={{ width: size + 32, height: size + 32 }}
      >
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="absolute inset-0">
            {dots.map((dot, i) => {
              const moduleSize = size / 33;
              return (
                <rect
                  key={i}
                  x={dot.x - moduleSize / 2}
                  y={dot.y - moduleSize / 2}
                  width={moduleSize}
                  height={moduleSize}
                  className="transition-all duration-500 ease-out"
                  style={{
                    transitionDelay: \\\`\\\${dot.delay}s\\\`,
                    opacity: dot.active ? 1 : 0,
                    transform: dot.active ? 'scale(1)' : 'scale(0)',
                    transformOrigin: \\\`\\\${dot.x}px \\\${dot.y}px\\\`,
                  }}
                  fill={dotColor}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <style jsx>{\\\`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      \\\`}</style>
    </div>
  );
}`,
    css: `// All styles are built into the component using Tailwind CSS
// Animation keyframes are included inline`,
    usage: `## Usage

An animated QR code that comes to life with dots animating in. Optional logo in the center.

### Installation

1. Copy the component code to your project: \`components/ui/AnimatedQRCode.tsx\`

### Usage Example

\`\`\`tsx
import AnimatedQRCode from "@/components/ui/AnimatedQRCode";

export default function MyPage() {
  return (
    <AnimatedQRCode 
      data="https://yourwebsite.com" 
      size={300}
      animationDuration={1.5}
      dotColor="#000000"
    />
  );
}
\`\`\`

### Props

- \`data\` (string, required): The data to encode in the QR code (URL, text, etc.)
- \`size\` (number, optional): Size of QR code in pixels (default: 300)
- \`animationDuration\` (number, optional): Duration in seconds for dots to form (default: 0.8)
- \`dotColor\` (string, optional): Color of the QR dots in hex format (default: "#000000")

### Features

- Animated dots that scale and fade in with staggered delays
- Uses QR Server API to generate QR codes
- Optional logo overlay in center
- Fully customizable size
- Smooth animations with React

### API Used

This component uses the free QR Server API: https://goqr.me/api/`,
  },
  {
    id: "music-player",
    name: "Music Player",
    description: "Instagram-style animated music player with rotating disk effect",
    category: "Effects",
    date: "2026-09-14",
    hasReactComponent: true,
    reactComponentPath: "@/components/ui/MusicPlayer",
    html: `"use client";

import { useState, useRef } from "react";

interface MusicPlayerProps {
  coverImage: string;
  audioSrc: string;
  songName?: string;
  artistName?: string;
}

export default function MusicPlayer({ coverImage, audioSrc, songName, artistName }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDiskOut, setIsDiskOut] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsDiskOut(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setIsDiskOut(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <audio ref={audioRef} src={audioSrc} />
      
      <div
        className="relative w-48 h-48 rounded-2xl bg-white cursor-pointer flex items-center justify-center"
        style={{
          backgroundImage: \`url(\${coverImage})\`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={handlePlayPause}
      >
        <img
          src={isPlaying ? "/pause-icon.svg" : "/play-icon.svg"}
          alt={isPlaying ? "Pause" : "Play"}
          className="w-12 h-12 z-10"
        />

        <div
          className={\`absolute left-0 -z-10 transition-transform duration-1000 ease-in-out \${
            isDiskOut ? "translate-x-[6.5rem]" : "translate-x-0"
          }\`}
        >
          <div
            className={\`relative w-44 h-44 bg-black rounded-full flex items-center justify-center overflow-hidden \${
              isPlaying ? "animate-spin" : ""
            }\`}
            style={{ animationDuration: "4.5s", animationTimingFunction: "linear" }}
          >
            <div
              className="absolute left-0 w-0 h-0 blur-[5px]"
              style={{
                borderLeft: "1.5rem solid transparent",
                borderRight: "1.5rem solid transparent",
                borderBottom: "3rem solid rgba(255, 255, 255, 0.21)",
                transform: "rotate(-260deg)",
              }}
            />
            <div
              className="absolute right-0 w-0 h-0 blur-[5px]"
              style={{
                borderLeft: "1.5rem solid transparent",
                borderRight: "1.5rem solid transparent",
                borderBottom: "3rem solid rgba(255, 255, 255, 0.21)",
                transform: "rotate(60deg)",
              }}
            />

            <div className="w-[5.5rem] h-[5.5rem] bg-black rounded-full flex items-center justify-center relative z-10">
              <div
                className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center relative"
                style={{
                  backgroundImage: \`url(\${coverImage})\`,
                  backgroundSize: "cover",
                }}
              >
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>

            <div 
              className="absolute w-[6.5rem] h-[6.5rem] bg-[rgb(59,59,59)] rounded-full -z-[9]"
              style={{ border: "0.4px solid black" }}
            />
            <div 
              className="absolute w-[7.5rem] h-[7.5rem] bg-[rgb(59,59,59)] rounded-full -z-[10]"
              style={{ border: "1px solid black" }}
            />
            <div 
              className="absolute w-[8.5rem] h-[8.5rem] bg-[rgb(59,59,59)] rounded-full -z-[11]"
              style={{ border: "0.4px solid black" }}
            />
            <div 
              className="absolute w-[9.5rem] h-[9.5rem] bg-[rgb(59,59,59)] rounded-full -z-[12]"
              style={{ border: "1px solid black" }}
            />
            <div className="absolute w-[10.5rem] h-[10.5rem] bg-[rgb(59,59,59)] rounded-full -z-[13]" />
          </div>
        </div>
      </div>

      {(songName || artistName) && (
        <div className="text-center">
          {songName && (
            <p className="text-white font-semibold text-sm font-space-grotesk">
              {songName}
            </p>
          )}
          {artistName && (
            <p className="text-zinc-400 text-xs font-inter mt-1">
              {artistName}
            </p>
          )}
        </div>
      )}
    </div>
  );
}`,
    css: `// All styles are built into the component using Tailwind CSS classes
// No separate CSS file needed`,
    usage: `## Usage

An Instagram-style music player with a rotating disk animation and smooth transitions.

### Installation

1. Copy the component code to your project: \`components/ui/MusicPlayer.tsx\`
2. Make sure you have the play and pause SVG icons in your \`public\` folder

### Usage Example

\`\`\`tsx
import MusicPlayer from "@/components/ui/MusicPlayer";

export default function MyPage() {
  return (
    <MusicPlayer 
      coverImage="/path/to/cover.jpg" 
      audioSrc="/path/to/audio.mp3"
      songName="Song Title"
      artistName="Artist Name"
    />
  );
}
\`\`\`

### Props

- \`coverImage\` (string, required): URL or path to the album cover image
- \`audioSrc\` (string, required): URL or path to the audio file (mp3, wav, etc.)
- \`songName\` (string, optional): Name of the song to display below the player
- \`artistName\` (string, optional): Name of the artist to display below the player

### Features

- Click to play/pause music
- Animated disk that slides out and rotates
- Smooth transitions and animations
- Customizable cover image and audio source
- Optional song and artist name display`,
  },
];

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

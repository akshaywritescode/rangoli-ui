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

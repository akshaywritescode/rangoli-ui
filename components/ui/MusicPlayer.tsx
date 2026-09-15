"use client";

import { useState, useRef, ReactNode } from "react";

interface MusicPlayerProps {
  coverImage: string;
  audioSrc: string;
  playIcon?: ReactNode; // Custom play icon (Lucide React or any component)
  pauseIcon?: ReactNode; // Custom pause icon (Lucide React or any component)
}

export default function MusicPlayer({ 
  coverImage, 
  audioSrc, 
  playIcon,
  pauseIcon
}: MusicPlayerProps) {
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
    <div 
      className="flex flex-col items-center justify-center gap-4"
    >
      <audio ref={audioRef} src={audioSrc} />
      
      <div
        className="relative w-48 h-48 rounded-2xl bg-white cursor-pointer flex items-center justify-center"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={handlePlayPause}
      >
        {/* Play/Pause Icon */}
        <div className="w-12 h-12 z-10 flex items-center justify-center">
          {isPlaying ? (
            pauseIcon || (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="12" width="6" height="24" rx="2" fill="white"/>
                <rect x="28" y="12" width="6" height="24" rx="2" fill="white"/>
              </svg>
            )
          ) : (
            playIcon || (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 10C16 8.89543 17.0447 8.2 18 8.7L36 20.7C36.9553 21.2 36.9553 22.8 36 23.3L18 35.3C17.0447 35.8 16 35.1046 16 34V10Z" fill="white"/>
              </svg>
            )
          )}
        </div>

        {/* Disk Wrapper */}
        <div
          className={`absolute left-0 -z-10 transition-transform duration-1000 ease-in-out ${
            isDiskOut ? "translate-x-[6.5rem]" : "translate-x-0"
          }`}
        >
          {/* Disk */}
          <div
            className={`relative w-44 h-44 bg-black rounded-full flex items-center justify-center overflow-hidden ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "4.5s", animationTimingFunction: "linear" }}
          >
            {/* Light effects */}
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

            {/* Disk Image Wrapper */}
            <div className="w-[5.5rem] h-[5.5rem] bg-black rounded-full flex items-center justify-center relative z-10">
              <div
                className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${coverImage})`,
                  backgroundSize: "cover",
                }}
              >
                {/* Center white dot */}
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>

            {/* Concentric circles - matching original CSS */}
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
    </div>
  );
}

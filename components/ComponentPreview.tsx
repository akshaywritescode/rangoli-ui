"use client";

import { Component } from "@/lib/components";
import MusicPlayer from "@/components/ui/MusicPlayer";

interface ComponentPreviewProps {
  component: Component;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  if (component.id === "music-player") {
    return (
      <div className="scale-75">
        <MusicPlayer 
          coverImage="https://static01.nyt.com/images/2021/02/11/arts/minari-anatomy2/11minari1-mediumSquareAt3X.jpg"
          audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          songName="Rain and Your Story"
          artistName="Emile Mosseri"
        />
      </div>
    );
  }

  return null;
}

"use client";

import { Component } from "@/lib/components";
import MusicPlayer from "@/components/ui/MusicPlayer";
import AnimatedQRCode from "@/components/ui/AnimatedQRCode";
import EventTicket from "@/components/ui/EventTicket";

interface ComponentPreviewProps {
  component: Component;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  if (component.id === "event-ticket") {
    return (
      <div className="scale-[0.35] origin-center">
        <EventTicket
          eventName="INIT Conference"
          eventDate="August 31 - September 4"
          holderName="Testing11"
          holderRole="Appwrite developer"
          ticketId="INIT-7440B2"
        />
      </div>
    );
  }

  if (component.id === "animated-qr-code") {
    return (
      <div className="scale-50">
        <AnimatedQRCode 
          data="https://github.com/rangoli-ui/rangoli"
          size={200}
          animationDuration={1.2}
        />
      </div>
    );
  }

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

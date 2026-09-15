"use client";

import { Component } from "@/lib/components";
import MusicPlayer from "@/components/ui/MusicPlayer";
import AnimatedQRCode from "@/components/ui/AnimatedQRCode";
import EventTicket from "@/components/ui/EventTicket";
import CreditCard from "@/components/ui/CreditCard";

interface ComponentPreviewProps {
  component: Component;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  if (component.id === "credit-card") {
    return (
      <div className="scale-75">
        <CreditCard
          cardNumber="1234 5678 9012 3456"
          cardHolder="AKSHAY KUMAR"
          expiryDate="12/27"
          cvv="789"
          cardBrand="RANGOLI"
          gradient="from-pink-500 via-purple-600 to-pink-700"
        />
      </div>
    );
  }

  if (component.id === "event-ticket") {
    return (
      <div className="scale-[0.35] origin-center">
        <EventTicket
          eventName="Apple Conference"
          eventDate="September 15 - September 20"
          holderName="Akshay"
          holderRole="Software Engineer"
          ticketId="APPLE-2024"
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
        />
      </div>
    );
  }

  return null;
}

"use client";

import { useTheme } from "next-themes";
import { Component } from "@/lib/components";
import MusicPlayer from "@/components/ui/MusicPlayer";
import AnimatedQRCode from "@/components/ui/AnimatedQRCode";
import EventTicket from "@/components/ui/EventTicket";
import CreditCard from "@/components/ui/CreditCard";
import InlineConfirmBtn from "@/components/ui/InlineConfirmBtn";

interface ComponentPreviewProps {
  component: Component;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  const { theme } = useTheme();
  
  if (component.id === "credit-card") {
    return (
      <div className="scale-[0.45]">
        <CreditCard
          cardNumber="•••• •••• •••• 3728"
          cardHolder="AKSHAY KUMAR"
          expiryDate="02/30"
          cvv="789"
          cardBrand="VISA"
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

  if (component.id === "inline-confirm") {
    return (
      <div className="scale-100">
        <InlineConfirmBtn
          corner={20}
          theme={theme as "light" | "dark"}
          onConfirm={() => console.log("Confirmed!")}
          onCancel={() => console.log("Cancelled")}
          onUndo={() => console.log("Undone")}
        />
      </div>
    );
  }

  return null;
}

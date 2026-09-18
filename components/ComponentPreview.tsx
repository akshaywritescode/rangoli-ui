"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Component } from "@/lib/components";
import MusicPlayer from "@/components/ui/MusicPlayer";
import AnimatedQRCode from "@/components/ui/AnimatedQRCode";
import EventTicket from "@/components/ui/EventTicket";
import CreditCard from "@/components/ui/CreditCard";
import InlineConfirmBtn from "@/components/ui/InlineConfirmBtn";

interface ComponentPreviewProps {
  component: Component;
  showThemeToggle?: boolean;
}

export function ComponentPreview({ component, showThemeToggle = false }: ComponentPreviewProps) {
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("dark");

  const renderComponent = () => {
    if (component.id === "credit-card") {
      return (
        <div className="scale-[0.45]">
          <CreditCard
            cardNumber="•••• •••• •••• 3728"
            cardHolder="AKSHAY KUMAR"
            expiryDate="02/30"
            cvv="789"
            cardBrand="VISA"
            theme={previewTheme}
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
            theme={previewTheme}
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
            theme={previewTheme}
            onConfirm={() => console.log("Confirmed!")}
            onCancel={() => console.log("Cancelled")}
            onUndo={() => console.log("Undone")}
          />
        </div>
      );
    }

    return null;
  };

  // If showThemeToggle is false, just render the component without the preview wrapper
  if (!showThemeToggle) {
    return renderComponent();
  }

  // Full preview with theme toggle
  return (
    <div className="relative">
      <div 
        className={`relative backdrop-blur-sm border rounded-2xl p-16 min-h-[400px] flex items-center justify-center transition-all duration-300 ${
          previewTheme === "dark" 
            ? "bg-zinc-950/50 border-white/10" 
            : "bg-white border-zinc-200"
        }`}
      >
        {/* Theme Toggle inside preview */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setPreviewTheme(previewTheme === "dark" ? "light" : "dark")}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              previewTheme === "dark"
                ? "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white"
                : "bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-600 hover:text-zinc-900"
            }`}
            title={`Switch to ${previewTheme === "dark" ? "light" : "dark"} theme`}
          >
            {previewTheme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        {renderComponent()}
      </div>
    </div>
  );
}

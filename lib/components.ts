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
    id: "credit-card",
    name: "Credit Card",
    description: "3D flip credit/debit card with front and back",
    category: "Cards",
    date: "2026-09-14",
    hasReactComponent: true,
    reactComponentPath: "@/components/ui/CreditCard",
    html: `"use client";

import { useState } from "react";

interface CreditCardProps {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  cardBrand?: string;
  cardBrandLogo?: string;
  backgroundImage?: string;
  gradient?: string;
  scale?: number;
  flipOnHover?: boolean;
}

export default function CreditCard({
  cardNumber = "•••• •••• •••• 4567",
  cardHolder = "JOHN DOE",
  expiryDate = "02/28",
  cvv = "123",
  cardBrand = "VISA",
  cardBrandLogo,
  backgroundImage = "/gradient-bgs-Image 34.png",
  gradient = "from-purple-600 via-blue-500 to-cyan-400",
  scale = 1,
  flipOnHover = false,
}: CreditCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!flipOnHover) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (flipOnHover) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (flipOnHover) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      className="perspective-1000"
      style={{ 
        transform: \`scale(\${scale})\`, 
        transformOrigin: 'center',
        perspective: '1000px'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={\`relative w-[420px] h-[260px] cursor-pointer transition-transform duration-700 preserve-3d \${
          isFlipped ? 'rotate-y-180' : ''
        }\`}
        onClick={handleFlip}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of Card */}
        <div
          className={\`absolute w-full h-full rounded-3xl shadow-2xl backface-hidden overflow-hidden \${
            backgroundImage ? '' : \`bg-gradient-to-br \${gradient}\`
          }\`}
          style={{ 
            backfaceVisibility: 'hidden',
            backgroundImage: backgroundImage ? \`url(\${backgroundImage})\` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Wave Pattern Overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M0 50 Q 25 30, 50 50 T 100 50" stroke="white" strokeWidth="1" fill="none" opacity="0.3"/>
                  <path d="M0 70 Q 25 50, 50 70 T 100 70" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wave)" />
            </svg>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col justify-between h-full p-8 text-white z-10">
            {/* Top Section: Chip & Logo */}
            <div className="flex justify-between items-start">
              {/* Realistic Chip */}
              <div className="relative w-16 h-12">
                <img 
                  src="https://pngimg.com/uploads/bank_chip/bank_chip_PNG3.png"
                  alt="Chip"
                  className="w-full h-full object-cover rounded-md drop-shadow-lg"
                />
              </div>

              {/* Card Brand */}
              {cardBrandLogo ? (
                <img src={cardBrandLogo} alt={cardBrand} className="h-14 object-contain drop-shadow-lg" />
              ) : cardBrand.toUpperCase() === "VISA" ? (
                <img 
                  src="https://download.logo.wine/logo/Visa_Inc./Visa_Inc.-Logo.wine.png"
                  alt="VISA"
                  className="h-14 object-contain drop-shadow-lg brightness-0 invert"
                />
              ) : (
                <div className="text-3xl font-bold tracking-wider drop-shadow-lg opacity-90">
                  {cardBrand}
                </div>
              )}
            </div>

            {/* Middle Section: Card Number */}
            <div className="mt-6">
              <div className="font-jetbrains-mono text-[22px] tracking-[0.25em] drop-shadow-lg font-semibold whitespace-nowrap">
                {cardNumber}
              </div>
            </div>

            {/* Bottom Section: Holder & Expiry */}
            <div className="flex justify-between items-end mt-4">
              <div className="space-y-1">
                <div className="text-[10px] opacity-80 uppercase tracking-widest">Card Holder</div>
                <div className="font-semibold text-base tracking-wide font-space-grotesk drop-shadow">
                  {cardHolder}
                </div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-[10px] opacity-80 uppercase tracking-widest">Expires</div>
                <div className="font-semibold text-base tracking-wide font-space-grotesk drop-shadow">
                  {expiryDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className={\`absolute w-full h-full rounded-3xl shadow-2xl backface-hidden overflow-hidden \${
            backgroundImage ? '' : \`bg-gradient-to-br \${gradient}\`
          }\`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundImage: backgroundImage ? \`url(\${backgroundImage})\` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient Orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col h-full text-white z-10">
            {/* Magnetic Stripe */}
            <div className="w-full h-16 bg-black/80 mt-8"></div>

            {/* CVV Section */}
            <div className="px-8 mt-8 space-y-4">
              <div className="w-full h-12 bg-white/90 rounded-lg flex items-center justify-end px-5 backdrop-blur-sm">
                <div className="bg-white text-black px-4 py-1.5 rounded font-jetbrains-mono font-bold text-sm italic tracking-wider">
                  {cvv}
                </div>
              </div>

              {/* Signature Panel */}
              <div className="w-full h-11 bg-white/80 backdrop-blur-sm rounded-lg flex items-center px-4">
                <div className="text-xs text-gray-700 italic font-semibold">Authorized Signature</div>
              </div>

              {/* Fine Print */}
              <div className="text-[9px] leading-relaxed opacity-70 mt-6">
                This card remains the property of the issuing bank. If found, please return to any branch. 
                Unauthorized use is prohibited and subject to prosecution.
              </div>
            </div>

            {/* Card Brand on Back */}
            <div className="mt-auto mb-8 px-8 flex justify-end">
              {cardBrandLogo ? (
                <img src={cardBrandLogo} alt={cardBrand} className="h-10 object-contain opacity-80 drop-shadow-lg" />
              ) : cardBrand.toUpperCase() === "VISA" ? (
                <img 
                  src="https://download.logo.wine/logo/Visa_Inc./Visa_Inc.-Logo.wine.png"
                  alt="VISA"
                  className="h-10 object-contain opacity-80 drop-shadow-lg brightness-0 invert"
                />
              ) : (
                <div className="text-2xl font-bold tracking-wider opacity-70 drop-shadow-lg">
                  {cardBrand}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    css: `// All styles are built into the component using Tailwind CSS
// 3D transform utilities added to globals.css`,
    usage: `## Usage

A realistic 3D flip credit/debit card component with smooth animations. Click to flip or set hover mode.

### Installation

1. Copy the component code to your project: \`components/ui/CreditCard.tsx\`
2. Add the 3D transform utilities to your \`globals.css\`:

\`\`\`css
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
\`\`\`

### Usage Example

\`\`\`tsx
import CreditCard from "@/components/ui/CreditCard";

export default function MyPage() {
  return (
    <CreditCard
      cardNumber="•••• •••• •••• 4567"
      cardHolder="JOHN DOE"
      expiryDate="02/28"
      cvv="123"
      cardBrand="VISA"
      gradient="from-purple-600 via-blue-500 to-cyan-400"
    />
  );
}
\`\`\`

### With Background Image

\`\`\`tsx
<CreditCard
  cardNumber="•••• •••• •••• 4567"
  cardHolder="JOHN DOE"
  expiryDate="02/28"
  cvv="123"
  cardBrand="VISA"
  backgroundImage="/card-texture.jpg"
/>
\`\`\`

### Props

- \`cardNumber\` (string, optional): Card number with spaces or bullets (default: "•••• •••• •••• 4567")
- \`cardHolder\` (string, optional): Cardholder name in uppercase (default: "JOHN DOE")
- \`expiryDate\` (string, optional): Expiry date MM/YY format (default: "02/28")
- \`cvv\` (string, optional): 3-digit CVV code on back (default: "123")
- \`cardBrand\` (string, optional): Card brand text (default: "VISA")
- \`cardBrandLogo\` (string, optional): URL to card brand logo image
- \`backgroundImage\` (string, optional): Custom background image URL - overrides gradient
- \`gradient\` (string, optional): Tailwind gradient classes (default: "from-purple-600 via-blue-500 to-cyan-400")
- \`scale\` (number, optional): Scale multiplier for component size (default: 1)
- \`flipOnHover\` (boolean, optional): Flip on hover instead of click (default: false)

### Features

- Smooth 3D flip animation (700ms)
- Click to flip or hover mode
- Realistic gold chip design with grid pattern
- Wave pattern overlay for depth
- Gradient orbs for visual interest
- Background image support
- Beautiful default gradient (purple-pink)
- Magnetic stripe and CVV panel on back
- Drop shadows for 3D depth
- Customizable everything`,
  },
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
  scale?: number;
  barcodeImage?: string;
  theme?: 'dark' | 'light';
}

export default function EventTicket({
  eventName,
  eventDate,
  holderName,
  holderRole,
  ticketId,
  eventLogo,
  scale = 1,
  barcodeImage,
  theme = 'dark',
}: EventTicketProps) {
  const bgGradient = theme === 'light' 
    ? 'from-white via-zinc-50 to-white'
    : 'from-zinc-900 via-zinc-800 to-zinc-900';
  
  const borderColor = theme === 'light' ? 'border-zinc-200' : 'border-white/10';
  const textPrimary = theme === 'light' ? 'text-zinc-900' : 'text-white';
  const textSecondary = theme === 'light' ? 'text-zinc-600' : 'text-zinc-400';
  const textTertiary = theme === 'light' ? 'text-zinc-500' : 'text-zinc-500';
  const dividerColor = theme === 'light' ? 'border-zinc-200' : 'border-white/10';
  const notchBg = theme === 'light' ? 'bg-white' : 'bg-black';
  const notchBorder = theme === 'light' ? 'border-zinc-200' : 'border-white/10';
  const lineOpacity = theme === 'light' ? '0.3' : '0.5';
  const circleBg = theme === 'light' ? 'bg-white' : 'bg-black';
  const circleBorder = theme === 'light' ? 'border-zinc-200' : 'border-white/10';
  const barcodeColor = theme === 'light' ? 'bg-zinc-900' : 'bg-white';

  return (
    <div className="relative w-full max-w-3xl" style={{ transform: \`scale(\${scale})\`, transformOrigin: 'center' }}>
      <div className={\`relative bg-gradient-to-br \${bgGradient} rounded-2xl border \${borderColor} overflow-hidden\`}>
        <div className="flex">
          <div className="flex-1 p-8 relative z-10">
            {eventLogo && (
              <div className="mb-6">
                <img src={eventLogo} alt="Event Logo" className="h-8 object-contain" />
              </div>
            )}

            <div className={\`\${textSecondary} text-sm font-medium mb-8 uppercase tracking-wider\`}>
              {eventDate}
            </div>

            <div className={\`border-t border-dashed \${dividerColor} mb-8\`}></div>

            <h3 className={\`text-4xl md:text-5xl font-bold \${textPrimary} mb-3 font-space-grotesk\`}>
              {holderName}
            </h3>

            <p className={\`\${textSecondary} text-lg mb-8 font-inter\`}>{holderRole}</p>

            <div className="space-y-2">
              <div className={\`text-xs \${textTertiary} uppercase tracking-wider\`}>Event Pass</div>
              <div className="text-pink-500 font-mono text-sm font-semibold">#{ticketId}</div>
            </div>
          </div>

          <div className="relative z-20">
            <div 
              className="absolute top-0 bottom-0 left-0 w-px" 
              style={{
                backgroundImage: \`repeating-linear-gradient(0deg, rgba(\${theme === 'light' ? '0,0,0' : '255,255,255'},\${lineOpacity}) 0px, rgba(\${theme === 'light' ? '0,0,0' : '255,255,255'},\${lineOpacity}) 6px, transparent 6px, transparent 12px)\`
              }}
            ></div>
            <div className="absolute inset-y-0 left-0 flex flex-col justify-evenly -translate-x-1/2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={\`w-2 h-2 rounded-full \${circleBg} border \${circleBorder}\`} />
              ))}
            </div>
          </div>

          <div className={\`w-64 relative bg-gradient-to-br \${bgGradient} p-8 z-10\`}>
            <div className="relative z-10 h-full flex flex-col items-center justify-between">
              <div className="text-center">
                <span className={\`\${textTertiary} text-xs uppercase tracking-widest\`}>{eventDate}</span>
              </div>

              <div className="flex flex-col items-center gap-6">
                {barcodeImage ? (
                  <div className="flex items-center justify-center h-32">
                    <img 
                      src={barcodeImage} 
                      alt="Barcode" 
                      className="max-h-32 max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex gap-1 h-32 items-end">
                    {[4, 8, 3, 6, 9, 4, 7, 5, 8, 3, 6, 4, 7, 9, 5, 6, 3, 8, 4, 7].map((height, i) => (
                      <div
                        key={i}
                        className={\`\${barcodeColor} rounded-sm\`}
                        style={{ width: '3px', height: \`\${height * 10}%\` }}
                      />
                    ))}
                  </div>
                )}

                <div className="text-center">
                  <div className="text-pink-500 font-mono text-xs font-bold tracking-wider">
                    {ticketId}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className={\`\${textSecondary} opacity-40 text-xs uppercase tracking-[0.2em] font-semibold\`}>
                  {eventName}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={\`absolute -top-2 left-[calc(100%-16rem)] -translate-x-1/2 w-4 h-4 rounded-full \${notchBg} border \${notchBorder} z-20\`}></div>
        <div className={\`absolute -bottom-2 left-[calc(100%-16rem)] -translate-x-1/2 w-4 h-4 rounded-full \${notchBg} border \${notchBorder} z-20\`}></div>
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
      eventName="Apple Conference"
      eventDate="September 15 - September 20"
      holderName="Akshay"
      holderRole="Software Engineer"
      ticketId="APPLE-2024"
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
- \`scale\` (number, optional): Scale multiplier for component size (default: 1, use 1.5 for 150%, 0.75 for 75%, etc.)
- \`barcodeImage\` (string, optional): Custom barcode or QR code image URL - replaces default barcode
- \`theme\` ('dark' | 'light', optional): Color theme (default: 'dark')

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
  animated?: boolean;
}

export default function AnimatedQRCode({ 
  data, 
  size = 300,
  animationDuration = 0.8,
  dotColor = "#000000",
  animated = true
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
              x: col * moduleSize,
              y: row * moduleSize,
              delay: animated ? Math.random() * animationDuration : 0,
              active: !animated,
            });
          }
        }
      }

      setDots(newDots);

      if (animated) {
        setTimeout(() => {
          setDots(prev => prev.map(dot => ({ ...dot, active: true })));
        }, 100);
      }
    };
  }, [qrData, size, animationDuration, animated]);

  return (
    <div className="relative inline-block">
      <canvas ref={canvasRef} className="hidden" />
      
      <div 
        className="relative bg-white rounded-2xl p-4"
        style={{ width: size + 32, height: size + 32 }}
      >
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="absolute inset-0">
            {dots.map((dotItem, i) => {
              const moduleSize = size / 33;
              return (
                <rect
                  key={i}
                  x={dotItem.x}
                  y={dotItem.y}
                  width={moduleSize}
                  height={moduleSize}
                  className="transition-all duration-500 ease-out"
                  style={{
                    transitionDelay: \`\${dotItem.delay}s\`,
                    opacity: dotItem.active ? 1 : 0,
                    transform: dotItem.active ? 'scale(1)' : 'scale(0)',
                    transformOrigin: 'center',
                  }}
                  fill={dotColor}
                />
              );
            })}
          </svg>
        </div>
      </div>
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
- \`size\` (number, optional): Size of QR code in pixels (default: 300) - controls the actual QR code dimensions
- \`animationDuration\` (number, optional): Duration in seconds for dots to form (default: 0.8)
- \`dotColor\` (string, optional): Color of the QR dots in hex format (default: "#000000")
- \`animated\` (boolean, optional): Enable/disable animation (default: true) - set to false for instant display

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
    name: "Instagram Music Player",
    description: "Instagram-style animated music player with rotating disk effect",
    category: "Effects",
    date: "2026-09-14",
    hasReactComponent: true,
    reactComponentPath: "@/components/ui/MusicPlayer",
    html: `"use client";

import { useState, useRef, ReactNode } from "react";

interface MusicPlayerProps {
  coverImage: string;
  audioSrc: string;
  scale?: number;
  playIcon?: ReactNode;
  pauseIcon?: ReactNode;
}

export default function MusicPlayer({ coverImage, audioSrc, scale = 1, playIcon, pauseIcon }: MusicPlayerProps) {
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
    <div className="flex flex-col items-center justify-center gap-4" style={{ transform: \`scale(\${scale})\`, transformOrigin: 'center' }}>
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
import { Play, Pause } from "lucide-react";

export default function MyPage() {
  return (
    <MusicPlayer 
      coverImage="/path/to/cover.jpg" 
      audioSrc="/path/to/audio.mp3"
      playIcon={<Play className="w-12 h-12" />}
      pauseIcon={<Pause className="w-12 h-12" />}
    />
  );
}
\`\`\`

### Props

- \`coverImage\` (string, required): URL or path to the album cover image
- \`audioSrc\` (string, required): URL or path to the audio file (mp3, wav, etc.)
- \`scale\` (number, optional): Scale multiplier for component size (default: 1, use 1.5 for 150%, 0.75 for 75%, etc.)
- \`playIcon\` (ReactNode, optional): Custom play icon component (Lucide React icon, image, or any React component). Defaults to built-in SVG icon
- \`pauseIcon\` (ReactNode, optional): Custom pause icon component (Lucide React icon, image, or any React component). Defaults to built-in SVG icon

### Features

- Click to play/pause music
- Animated disk that slides out and rotates
- Smooth transitions and animations
- Customizable cover image and audio source
- Custom play/pause icons support (Lucide React, images, or any React component)
- Default SVG icons included as fallback
- Adjustable size with scale prop`,
  },
];

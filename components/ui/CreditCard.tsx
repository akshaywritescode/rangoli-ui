"use client";

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
  backgroundImage,
  gradient = "from-[#667eea] via-[#764ba2] to-[#f093fb]",
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
        transform: `scale(${scale})`, 
        transformOrigin: 'center',
        perspective: '1000px'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-[420px] h-[260px] cursor-pointer transition-transform duration-700 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of Card */}
        <div
          className={`absolute w-full h-full rounded-3xl shadow-2xl backface-hidden overflow-hidden ${
            backgroundImage ? '' : `bg-gradient-to-br ${gradient}`
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
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
              <div className="relative w-14 h-11 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400"></div>
                <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 rounded-md"></div>
                <div className="absolute inset-1 grid grid-cols-4 gap-0.5 p-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="bg-yellow-400/60 rounded-[1px]"></div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-600/30"></div>
              </div>

              {/* Card Brand */}
              {cardBrandLogo ? (
                <img src={cardBrandLogo} alt={cardBrand} className="h-10 object-contain drop-shadow-lg" />
              ) : (
                <div className="text-2xl font-bold tracking-wider drop-shadow-lg opacity-90">
                  {cardBrand}
                </div>
              )}
            </div>

            {/* Middle Section: Card Number */}
            <div className="mt-6">
              <div className="font-jetbrains-mono text-[22px] tracking-[0.3em] drop-shadow-lg font-semibold">
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
          className={`absolute w-full h-full rounded-3xl shadow-2xl backface-hidden overflow-hidden ${
            backgroundImage ? '' : `bg-gradient-to-br ${gradient}`
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
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
                <img src={cardBrandLogo} alt={cardBrand} className="h-8 object-contain opacity-80 drop-shadow-lg" />
              ) : (
                <div className="text-xl font-bold tracking-wider opacity-70 drop-shadow-lg">
                  {cardBrand}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

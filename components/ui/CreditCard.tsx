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
              <div className="relative w-16 h-12 rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400"></div>
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute inset-2 border-2 border-amber-600 rounded"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-600/30"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tl from-amber-600/20 via-transparent to-transparent"></div>
              </div>

              {/* Card Brand */}
              {cardBrandLogo ? (
                <img src={cardBrandLogo} alt={cardBrand} className="h-16 object-contain drop-shadow-lg" />
              ) : cardBrand.toUpperCase() === "VISA" ? (
                <svg width="120" height="40" viewBox="0 0 141.732 141.732" className="drop-shadow-lg">
                  <g fill="#fff">
                    <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"/>
                  </g>
                </svg>
              ) : (
                <div className="text-3xl font-bold tracking-wider drop-shadow-lg opacity-90">
                  {cardBrand}
                </div>
              )}
            </div>

            {/* Middle Section: Card Number */}
            <div className="mt-6">
              <div className="font-jetbrains-mono text-[22px] tracking-[0.3em] drop-shadow-lg font-semibold whitespace-nowrap">
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
                <img src={cardBrandLogo} alt={cardBrand} className="h-12 object-contain opacity-80 drop-shadow-lg" />
              ) : cardBrand.toUpperCase() === "VISA" ? (
                <svg width="100" height="32" viewBox="0 0 141.732 141.732" className="drop-shadow-lg opacity-80">
                  <g fill="#fff">
                    <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"/>
                  </g>
                </svg>
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
}

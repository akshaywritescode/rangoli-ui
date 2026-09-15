"use client";

import { useState } from "react";

interface CreditCardProps {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  cardBrand?: string;
  cardBrandLogo?: string;
  gradient?: string;
  scale?: number;
  flipOnHover?: boolean;
}

export default function CreditCard({
  cardNumber = "1234 5678 9012 3456",
  cardHolder = "JOHN DOE",
  expiryDate = "12/25",
  cvv = "123",
  cardBrand = "VISA",
  cardBrandLogo,
  gradient = "from-pink-500 via-purple-600 to-indigo-600",
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
        className={`relative w-[400px] h-[250px] cursor-pointer transition-transform duration-700 preserve-3d ${
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
          className={`absolute w-full h-full rounded-2xl bg-gradient-to-br ${gradient} p-6 shadow-2xl backface-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col justify-between h-full text-white">
            {/* Card Brand Logo */}
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center">
                <div className="w-8 h-6 rounded bg-gradient-to-br from-yellow-400 to-yellow-200"></div>
              </div>
              {cardBrandLogo ? (
                <img src={cardBrandLogo} alt={cardBrand} className="h-12 object-contain" />
              ) : (
                <div className="text-2xl font-bold tracking-wider opacity-80">{cardBrand}</div>
              )}
            </div>

            {/* Card Number */}
            <div className="space-y-4">
              <div className="font-jetbrains-mono text-2xl tracking-widest">
                {cardNumber}
              </div>

              {/* Card Holder and Expiry */}
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-70 uppercase tracking-wider mb-1">Card Holder</div>
                  <div className="font-semibold text-sm tracking-wider font-space-grotesk">
                    {cardHolder}
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-70 uppercase tracking-wider mb-1">Expires</div>
                  <div className="font-semibold text-sm tracking-wider font-space-grotesk">
                    {expiryDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        {/* Back of Card */}
        <div
          className={`absolute w-full h-full rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl backface-hidden`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex flex-col h-full text-white">
            {/* Magnetic Stripe */}
            <div className="w-full h-14 bg-black mt-6"></div>

            {/* CVV Section */}
            <div className="px-6 mt-6 space-y-4">
              <div className="w-full h-12 bg-white/20 rounded flex items-center justify-end px-4">
                <div className="bg-white text-black px-3 py-1 rounded font-jetbrains-mono font-semibold text-sm">
                  {cvv}
                </div>
              </div>

              {/* Signature Panel */}
              <div className="w-full h-10 bg-white/10 rounded flex items-center px-3">
                <div className="text-xs opacity-50 italic">Authorized Signature</div>
              </div>

              {/* Info Text */}
              <div className="text-[10px] opacity-40 leading-relaxed mt-4">
                This card is property of the bank. If found, please return to any branch or call customer service. 
                Unauthorized use is prohibited and punishable by law.
              </div>
            </div>

            {/* Card Brand on Back */}
            <div className="mt-auto mb-6 px-6 flex justify-end">
              {cardBrandLogo ? (
                <img src={cardBrandLogo} alt={cardBrand} className="h-8 object-contain opacity-80" />
              ) : (
                <div className="text-lg font-bold tracking-wider opacity-60">{cardBrand}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

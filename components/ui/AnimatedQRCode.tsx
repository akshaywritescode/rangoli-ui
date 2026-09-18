"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedQRCodeProps {
  data: string;
  size?: number;
  animationDuration?: number;
  dotColor?: string;
  animated?: boolean;
  className?: string;
  scale?: number;
}

export default function AnimatedQRCode({ 
  data, 
  size = 300,
  animationDuration = 0.8,
  dotColor = "#000000",
  animated = true,
  className = "",
  scale = 1
}: AnimatedQRCodeProps) {
  const [qrData, setQrData] = useState<string>("");
  const [dots, setDots] = useState<{ x: number; y: number; delay: number; active: boolean }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code URL using QR Server API
  useEffect(() => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&format=png`;
    setQrData(qrUrl);
  }, [data, size]);

  // Parse QR code and create animated dots
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
      
      // Use fixed module size for better performance
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
          
          // If pixel is dark (part of QR code)
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

      // Animate dots coming to life
      if (animated) {
        setTimeout(() => {
          setDots(prev => prev.map(dot => ({ ...dot, active: true })));
        }, 100);
      }
    };
  }, [qrData, size, animationDuration, animated]);

  return (
    <div className={`relative inline-block ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Animated dots container */}
      <div 
        className="relative bg-white rounded-2xl p-4 border border-zinc-200 shadow-xl"
        style={{ width: size + 32, height: size + 32 }}
      >
        <div className="relative" style={{ width: size, height: size }}>
          {/* Animated dots */}
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
                    transitionDelay: `${dotItem.delay}s`,
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
}

"use client";

interface EventTicketProps {
  eventName: string;
  eventDate: string;
  holderName: string;
  holderRole: string;
  ticketId: string;
  eventLogo?: string;
  barcodeImage?: string; // Custom barcode or QR code image URL
  theme?: 'dark' | 'light'; // Color theme (default: 'dark')
}

export default function EventTicket({
  eventName,
  eventDate,
  holderName,
  holderRole,
  ticketId,
  eventLogo,
  barcodeImage,
  theme = 'dark',
}: EventTicketProps) {
  // Theme-based colors
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
  const dotPattern = theme === 'light' 
    ? 'rgba(236,72,153,0.15)' 
    : 'rgba(236,72,153,0.4)';

  return (
    <div 
      className="relative w-full max-w-3xl"
    >
      {/* Ticket Container */}
      <div className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl border ${borderColor} overflow-hidden`}>
        <div className="flex relative">
          {/* Left Side - Info */}
          <div className="flex-1 p-8 relative z-10">
            {/* Event Logo */}
            {eventLogo && (
              <div className="mb-6">
                <img src={eventLogo} alt="Event Logo" className="h-8 object-contain" />
              </div>
            )}

            {/* Date */}
            <div className={`${textSecondary} text-sm font-medium mb-8 uppercase tracking-wider`}>
              {eventDate}
            </div>

            {/* Divider */}
            <div className={`border-t border-dashed ${dividerColor} mb-8`}></div>

            {/* Holder Name */}
            <h3 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-3 font-space-grotesk`}>
              {holderName}
            </h3>

            {/* Holder Role */}
            <p className={`${textSecondary} text-lg mb-8 font-inter`}>{holderRole}</p>

            {/* Ticket Type & ID */}
            <div className="space-y-2">
              <div className={`text-xs ${textTertiary} uppercase tracking-wider`}>Event Pass</div>
              <div className="text-pink-500 font-mono text-sm font-semibold">#{ticketId}</div>
            </div>
          </div>

          {/* Perforated Divider with Semi-circles */}
          <div className="relative z-20">
            {/* Vertical dashed line */}
            <div 
              className="absolute top-0 bottom-0 left-0 w-px" 
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, rgba(${theme === 'light' ? '0,0,0' : '255,255,255'},${lineOpacity}) 0px, rgba(${theme === 'light' ? '0,0,0' : '255,255,255'},${lineOpacity}) 6px, transparent 6px, transparent 12px)`
              }}
            ></div>
            {/* Semi-circles */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-evenly -translate-x-1/2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${circleBg} border ${circleBorder}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Barcode Style */}
          <div className={`w-64 relative bg-gradient-to-br ${bgGradient} p-8 z-10`}>
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-between">
              {/* Top - Event Date */}
              <div className="text-center">
                <span className={`${textTertiary} text-xs uppercase tracking-widest`}>{eventDate}</span>
              </div>

              {/* Center - Barcode or Custom Image */}
              <div className="flex flex-col items-center gap-6">
                {barcodeImage ? (
                  // Custom barcode/QR image
                  <div className="flex items-center justify-center h-32">
                    <img 
                      src={barcodeImage} 
                      alt="Barcode" 
                      className="max-h-32 max-w-full object-contain"
                    />
                  </div>
                ) : (
                  // Default generated barcode
                  <div className="flex gap-1 h-32 items-end">
                    {[4, 8, 3, 6, 9, 4, 7, 5, 8, 3, 6, 4, 7, 9, 5, 6, 3, 8, 4, 7].map((height, i) => (
                      <div
                        key={i}
                        className={`${barcodeColor} rounded-sm`}
                        style={{
                          width: '3px',
                          height: `${height * 10}%`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Ticket ID below barcode */}
                <div className="text-center">
                  <div className="text-pink-500 font-mono text-xs font-bold tracking-wider">
                    {ticketId}
                  </div>
                </div>
              </div>

              {/* Bottom - Event Name */}
              <div className="text-center">
                <div className={`${textSecondary} opacity-40 text-xs uppercase tracking-[0.2em] font-semibold`}>
                  {eventName}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Punched-out semi-circles at perforation line top/bottom */}
        <div className={`absolute -top-2 left-[calc(100%-16rem)] -translate-x-1/2 w-4 h-4 rounded-full ${notchBg} border ${notchBorder} z-20`}></div>
        <div className={`absolute -bottom-2 left-[calc(100%-16rem)] -translate-x-1/2 w-4 h-4 rounded-full ${notchBg} border ${notchBorder} z-20`}></div>
      </div>
    </div>
  );
}

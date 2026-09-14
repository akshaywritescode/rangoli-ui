"use client";

interface EventTicketProps {
  eventName: string;
  eventDate: string;
  holderName: string;
  holderRole: string;
  ticketId: string;
  eventLogo?: string;
  backgroundImage?: string;
}

export default function EventTicket({
  eventName,
  eventDate,
  holderName,
  holderRole,
  ticketId,
  eventLogo,
  backgroundImage,
}: EventTicketProps) {
  return (
    <div className="relative w-full max-w-3xl">
      {/* Ticket Container */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden border border-white/10">
        <div className="flex">
          {/* Left Side - Info */}
          <div className="flex-1 p-8 relative z-10">
            {/* Event Logo */}
            {eventLogo && (
              <div className="mb-6">
                <img src={eventLogo} alt="Event Logo" className="h-8 object-contain" />
              </div>
            )}

            {/* Date */}
            <div className="text-zinc-400 text-sm font-medium mb-8 uppercase tracking-wider">
              {eventDate}
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-white/10 mb-8"></div>

            {/* Holder Name */}
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 font-space-grotesk">
              {holderName}
            </h3>

            {/* Holder Role */}
            <p className="text-zinc-400 text-lg mb-8 font-inter">{holderRole}</p>

            {/* Ticket Type & ID */}
            <div className="space-y-2">
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Event Pass</div>
              <div className="text-pink-500 font-mono text-sm font-semibold">#{ticketId}</div>
            </div>
          </div>

          {/* Perforated Divider */}
          <div className="relative w-0">
            {/* Perforation circles */}
            <div className="absolute top-0 bottom-0 -left-2 w-4 flex flex-col justify-around">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-black border border-white/10"
                />
              ))}
            </div>
            {/* Dashed line */}
            <div className="absolute top-0 bottom-0 left-0 w-px border-l-2 border-dashed border-white/10"></div>
          </div>

          {/* Right Side - Visual/QR */}
          <div className="w-80 relative overflow-hidden">
            {/* Background Image/Gradient */}
            {backgroundImage ? (
              <img
                src={backgroundImage}
                alt="Event visual"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-purple-600/20 to-pink-600/20"></div>
            )}

            {/* Overlay Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
              {/* Event Name Vertical */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-pink-500 font-mono text-xs font-bold">#{ticketId}</span>
                  <span className="text-white/90 font-bold text-lg tracking-wider">{holderName}</span>
                </div>
              </div>

              {/* Date Vertical */}
              <div className="absolute right-6 bottom-8 -rotate-90 origin-bottom-right">
                <span className="text-white/60 text-xs uppercase tracking-widest">{eventDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Notches */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border border-white/10"></div>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border border-white/10"></div>
      </div>
    </div>
  );
}

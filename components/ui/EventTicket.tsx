"use client";

interface EventTicketProps {
  eventName: string;
  eventDate: string;
  holderName: string;
  holderRole: string;
  ticketId: string;
  eventLogo?: string;
}

export default function EventTicket({
  eventName,
  eventDate,
  holderName,
  holderRole,
  ticketId,
  eventLogo,
}: EventTicketProps) {
  return (
    <div className="relative w-full max-w-3xl">
      {/* Ticket Container */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
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

          {/* Perforated Divider with Semi-circles */}
          <div className="relative w-0">
            {/* Dashed line */}
            <div className="absolute inset-y-0 left-0 w-px border-l border-dashed border-white/30"></div>
            {/* Semi-circles cutting through - only show left half */}
            <div className="absolute inset-y-0 -left-1 w-2 flex flex-col justify-evenly">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
                />
              ))}
            </div>
          </div>

          {/* Right Side - Barcode Style */}
          <div className="w-64 relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-between">
              {/* Top - Event Date */}
              <div className="text-center">
                <span className="text-zinc-500 text-xs uppercase tracking-widest">{eventDate}</span>
              </div>

              {/* Center - Barcode */}
              <div className="flex flex-col items-center gap-6">
                {/* Vertical Barcode Bars */}
                <div className="flex gap-1 h-32 items-end">
                  {[4, 8, 3, 6, 9, 4, 7, 5, 8, 3, 6, 4, 7, 9, 5, 6, 3, 8, 4, 7].map((height, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-sm"
                      style={{
                        width: '3px',
                        height: `${height * 10}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Ticket ID below barcode */}
                <div className="text-center">
                  <div className="text-pink-500 font-mono text-xs font-bold tracking-wider">
                    {ticketId}
                  </div>
                </div>
              </div>

              {/* Bottom - Event Name Rotated */}
              <div className="text-center">
                <div className="text-white/40 text-xs uppercase tracking-[0.2em] font-semibold">
                  {eventName}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top and Bottom Notches for tear effect */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border border-white/10"></div>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border border-white/10"></div>
      </div>
    </div>
  );
}

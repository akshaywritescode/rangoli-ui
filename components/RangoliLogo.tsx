export function RangoliLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300"
    >
      {/* Center circle */}
      <circle cx="50" cy="50" r="8" fill="#a855f7" />
      
      {/* Inner ring - 8 petals with vibrant colors */}
      <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '50px 50px' }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#c026d3', '#d946ef', '#e879f9', '#f0abfc', '#f5d0fe'];
          return (
            <ellipse
              key={angle}
              cx="50"
              cy="50"
              rx="6"
              ry="18"
              fill={colors[i % colors.length]}
              opacity="0.9"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </g>
    </svg>
  );
}

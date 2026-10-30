import React from 'react';

interface SpirographProps {
  className?: string;
  size?: number;
  color?: string; // 'gold' | 'white' | 'dual'
  variant?: 'full' | 'half' | 'corner';
}

export const SpirographMotif: React.FC<SpirographProps> = ({
  className = '',
  size = 400,
  color = 'gold',
  variant = 'full'
}) => {
  const lineCount = 72; // dense geometric lines
  const center = size / 2;
  const innerRadius = size * 0.18;
  const outerRadius = size * 0.46;

  const lines = Array.from({ length: lineCount }, (_, i) => {
    const angle = (i * 360) / lineCount;
    const rad = (angle * Math.PI) / 180;
    const x1 = center + innerRadius * Math.cos(rad);
    const y1 = center + innerRadius * Math.sin(rad);
    const x2 = center + outerRadius * Math.cos(rad);
    const y2 = center + outerRadius * Math.sin(rad);

    return { id: i, x1, y1, x2, y2, angle };
  });

  const strokeColor =
    color === 'gold'
      ? 'rgba(234, 179, 8, 0.55)'
      : color === 'white'
      ? 'rgba(255, 255, 255, 0.45)'
      : 'rgba(245, 158, 11, 0.6)';

  return (
    <div
      className={`pointer-events-none select-none relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Central dark disc to replicate the portfolio's circular cut-out effect */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeDasharray="2 4"
        />

        {/* Outer perimeter guide rings */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius * 0.75}
          fill="none"
          stroke="rgba(245, 158, 11, 0.15)"
          strokeWidth="0.8"
        />
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="rgba(245, 158, 11, 0.2)"
          strokeWidth="0.8"
        />

        {/* Dense radial spokes from inner radius to outer radius */}
        {lines.map(line => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={strokeColor}
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity={line.id % 2 === 0 ? 0.9 : 0.4}
          />
        ))}

        {/* Secondary nested spiral arcs to give mathematical spirograph depth */}
        {Array.from({ length: 12 }, (_, i) => {
          const r = innerRadius + (i * (outerRadius - innerRadius)) / 12;
          return (
            <circle
              key={`orbit-${i}`}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>
    </div>
  );
};

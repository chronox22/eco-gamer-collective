
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 4,
  className,
  color = 'stroke-primary',
  showPercentage = true,
  children,
}: ProgressRingProps) {
  const [offset, setOffset] = useState(0);
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color} transition-all duration-700 ease-out`}
          style={{
            animation: 'progress-ring 1.5s ease-out forwards',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children ? (
          children
        ) : (
          showPercentage && (
            <div className="text-center">
              <span className="text-xl font-semibold animate-scale-in">{Math.round(progress)}%</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

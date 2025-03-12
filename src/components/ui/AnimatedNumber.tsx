
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 1500,
  decimals = 0,
  className,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;
    const difference = endValue - startValue;
    
    const step = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentValue = startValue + difference * easeProgress;
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    requestAnimationFrame(step);
    
    return () => {
      // Cleanup
    };
  }, [value, duration]);
  
  return (
    <span className={cn('inline-block', className)}>
      {displayValue.toFixed(decimals)}
    </span>
  );
}

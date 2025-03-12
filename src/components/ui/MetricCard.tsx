
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedNumber } from './AnimatedNumber';

interface MetricCardProps {
  title: string;
  value: number;
  icon?: LucideIcon;
  suffix?: string;
  prefix?: string;
  className?: string;
  trend?: {
    value: number;
    positive?: boolean;
  };
  decimals?: number;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  suffix,
  prefix,
  className,
  trend,
  decimals = 0,
}: MetricCardProps) {
  return (
    <Card className={cn('glass-card hover-card overflow-hidden', className)}>
      <CardContent className="p-6 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="metric-label">{title}</h3>
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        </div>
        <div className="flex items-baseline">
          {prefix && <span className="text-xl mr-1">{prefix}</span>}
          <AnimatedNumber value={value} decimals={decimals} className="metric-value" />
          {suffix && <span className="text-xl ml-1">{suffix}</span>}
        </div>
        {trend && (
          <div className="flex items-center text-xs">
            <span
              className={cn(
                'flex items-center',
                trend.positive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {trend.positive ? (
                <span className="inline-block mr-1">↑</span>
              ) : (
                <span className="inline-block mr-1">↓</span>
              )}
              {trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">vs. last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

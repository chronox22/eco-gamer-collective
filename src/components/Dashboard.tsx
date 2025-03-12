
import React from 'react';
import { Leaf, Cloud, DropletIcon, Recycle } from 'lucide-react';
import { ProgressRing } from './ui/ProgressRing';
import { MetricCard } from './ui/MetricCard';
import { Separator } from '@/components/ui/separator';

export function Dashboard() {
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-block bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary">Today</span>
        </div>
        <h1 className="text-3xl font-medium tracking-tight">Good morning</h1>
        <p className="text-muted-foreground">Your environmental impact today</p>
      </div>
      
      <div className="flex justify-center">
        <ProgressRing 
          progress={72} 
          size={160} 
          showPercentage={false}
          className="my-4"
        >
          <div className="text-center space-y-1">
            <Leaf className="h-6 w-6 mx-auto text-primary" />
            <span className="text-2xl font-semibold">72%</span>
            <p className="text-xs text-muted-foreground">Eco Score</p>
          </div>
        </ProgressRing>
      </div>
      
      <Separator className="my-6" />
      
      <div className="space-y-3">
        <h2 className="text-xl font-medium">Today's Impact</h2>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            title="Carbon Saved" 
            value={2.4} 
            suffix="kg" 
            icon={Cloud} 
            trend={{ value: 12, positive: true }}
            decimals={1}
          />
          <MetricCard 
            title="Water Saved" 
            value={18} 
            suffix="L" 
            icon={DropletIcon} 
            trend={{ value: 5, positive: true }}
          />
          <MetricCard 
            title="Waste Reduced" 
            value={0.8} 
            suffix="kg" 
            icon={Recycle} 
            trend={{ value: 8, positive: true }}
            decimals={1}
          />
          <MetricCard 
            title="Trees Impact" 
            value={3} 
            suffix="hrs" 
            icon={Leaf} 
            trend={{ value: 10, positive: true }}
          />
        </div>
      </div>
    </section>
  );
}

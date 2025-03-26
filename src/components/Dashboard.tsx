
import React, { useState, useEffect } from 'react';
import { Leaf, Cloud, DropletIcon, Recycle } from 'lucide-react';
import { ProgressRing } from './ui/ProgressRing';
import { MetricCard } from './ui/MetricCard';
import { Separator } from '@/components/ui/separator';
import { WordOfTheDay } from './WordOfTheDay';
import { VerseOfTheDay } from './VerseOfTheDay';

export function Dashboard() {
  const [metrics, setMetrics] = useState({
    carbonSaved: 2.4,
    waterSaved: 18,
    wasteReduced: 0.8,
    treesImpact: 3
  });

  useEffect(() => {
    // Generate daily metrics based on the date
    const generateDailyMetrics = () => {
      const today = new Date().toDateString();
      const storedMetricsData = localStorage.getItem('dailyMetrics');
      
      if (storedMetricsData) {
        try {
          const { date, metrics: storedMetrics } = JSON.parse(storedMetricsData);
          
          if (date === today) {
            // Use stored metrics if they exist for today
            setMetrics(storedMetrics);
            return;
          }
        } catch (error) {
          console.error('Error parsing stored metrics:', error);
        }
      }
      
      // Create new metrics with small random variations each day
      const seed = new Date().getDate() + new Date().getMonth() + 1;
      const newMetrics = {
        carbonSaved: parseFloat((2 + (seed % 3) * 0.3).toFixed(1)),
        waterSaved: Math.floor(15 + (seed % 7) * 1.5),
        wasteReduced: parseFloat((0.6 + (seed % 5) * 0.1).toFixed(1)),
        treesImpact: Math.floor(2 + (seed % 4))
      };
      
      // Store the new metrics
      localStorage.setItem('dailyMetrics', JSON.stringify({
        date: today,
        metrics: newMetrics
      }));
      
      setMetrics(newMetrics);
    };
    
    generateDailyMetrics();
  }, []);

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-block bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary">Today</span>
        </div>
        <h1 className="text-3xl font-medium tracking-tight">Good morning</h1>
        <p className="text-muted-foreground">Your environmental impact today</p>
      </div>
      
      <WordOfTheDay />
      
      <VerseOfTheDay />
      
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
            value={metrics.carbonSaved} 
            suffix="kg" 
            icon={Cloud} 
            trend={{ value: 12, positive: true }}
            decimals={1}
          />
          <MetricCard 
            title="Water Saved" 
            value={metrics.waterSaved} 
            suffix="L" 
            icon={DropletIcon} 
            trend={{ value: 5, positive: true }}
          />
          <MetricCard 
            title="Waste Reduced" 
            value={metrics.wasteReduced} 
            suffix="kg" 
            icon={Recycle} 
            trend={{ value: 8, positive: true }}
            decimals={1}
          />
          <MetricCard 
            title="Trees Impact" 
            value={metrics.treesImpact} 
            suffix="hrs" 
            icon={Leaf} 
            trend={{ value: 10, positive: true }}
          />
        </div>
      </div>
    </section>
  );
}

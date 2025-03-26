
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Bike, Coffee, DropletIcon, Recycle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

// Define a simple habit interface
interface Habit {
  id: string;
  name: string;
  icon: React.ElementType;
}

export function HabitTracker() {
  // Define a list of simple habits
  const habits: Habit[] = [
    { id: 'biking', name: 'Bike to work', icon: Bike },
    { id: 'reusable', name: 'Use reusable cup', icon: Coffee },
    { id: 'water', name: 'Take cold shower', icon: DropletIcon },
    { id: 'recycle', name: 'Recycle today', icon: Recycle },
    { id: 'energy', name: 'Save energy', icon: Lightbulb },
  ];

  // Track completed habits
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // Load from localStorage on component mount
  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('habitTrackerData');
    
    if (storedData) {
      try {
        const { date, completed: storedCompleted } = JSON.parse(storedData);
        
        // Only use stored data if it's from today
        if (date === today) {
          setCompleted(storedCompleted);
        } else {
          // Reset for a new day
          initializeHabits();
        }
      } catch (error) {
        console.error('Error parsing stored habit data:', error);
        initializeHabits();
      }
    } else {
      initializeHabits();
    }
  }, []);

  // Initialize all habits as not completed
  const initializeHabits = () => {
    const initialCompleted: Record<string, boolean> = {};
    habits.forEach(habit => {
      initialCompleted[habit.id] = false;
    });
    
    setCompleted(initialCompleted);
    saveToLocalStorage(initialCompleted);
  };

  // Toggle a habit's completion status
  const toggleHabit = (id: string) => {
    const newCompleted = {
      ...completed,
      [id]: !completed[id]
    };
    
    setCompleted(newCompleted);
    saveToLocalStorage(newCompleted);
  };

  // Save current state to localStorage
  const saveToLocalStorage = (completedState: Record<string, boolean>) => {
    const today = new Date().toDateString();
    localStorage.setItem('habitTrackerData', JSON.stringify({
      date: today,
      completed: completedState
    }));
  };

  // Calculate progress
  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalHabits = habits.length;
  const progress = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">Habits</h1>
        <p className="text-muted-foreground">{completedCount}/{totalHabits} completed</p>
      </div>
      
      <Progress 
        value={progress} 
        className="h-2 w-full" 
        aria-label="Habits completion progress"
      />

      <div className="space-y-4">
        {habits.map((habit) => {
          const isCompleted = completed[habit.id] || false;
          const Icon = habit.icon;
          
          return (
            <Card 
              key={habit.id}
              className={cn(
                "border transition-all duration-200", 
                isCompleted ? "border-primary bg-primary/10" : ""
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      isCompleted ? "bg-primary text-primary-foreground" : "bg-secondary"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{habit.name}</span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant={isCompleted ? "default" : "outline"}
                    className="rounded-full w-10 h-10 p-0"
                    onClick={() => toggleHabit(habit.id)}
                  >
                    <Check className="h-5 w-5" />
                    <span className="sr-only">Complete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Separator className="my-4" />
      
      <div className="text-center text-sm text-muted-foreground">
        {progress === 100 ? (
          <p>Great job! You've completed all your habits today.</p>
        ) : (
          <p>You've completed {progress}% of your habits today.</p>
        )}
      </div>
    </section>
  );
}


import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Bike, Coffee, DropletIcon, Recycle, Lightbulb, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ProgressRing } from '@/components/ui/ProgressRing';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Habit {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  impact: string;
}

export function HabitTracker() {
  // Exactly 5 habits with detailed descriptions
  const habits: Habit[] = [
    { 
      id: 'biking', 
      name: 'Bike to work', 
      icon: Bike,
      description: 'Use a bike instead of a car for your commute',
      impact: 'Saves 3.6kg of CO2 emissions'
    },
    { 
      id: 'reusable', 
      name: 'Use reusable cup', 
      icon: Coffee,
      description: 'Bring your own cup for coffee or drinks',
      impact: 'Saves 9g of plastic waste'
    },
    { 
      id: 'water', 
      name: 'Take cold shower', 
      icon: DropletIcon,
      description: 'Reduce hot water usage by taking a cold shower',
      impact: 'Saves 2.1kg of CO2 emissions'
    },
    { 
      id: 'recycle', 
      name: 'Recycle today', 
      icon: Recycle,
      description: 'Properly sort and recycle all eligible waste',
      impact: 'Saves 1.8kg of landfill waste'
    },
    { 
      id: 'energy', 
      name: 'Save energy', 
      icon: Lightbulb,
      description: 'Turn off lights and appliances when not in use',
      impact: 'Saves 1.4kg of CO2 emissions'
    },
  ];

  // Track completed habits
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const { toast } = useToast();

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
          
          // Check if all habits are completed
          const allCompleted = Object.values(storedCompleted).every(Boolean) && 
                             Object.keys(storedCompleted).length === 5;
          
          if (allCompleted) {
            // If loading completed data, don't show dialog immediately
            // This prevents showing the dialog every time the page loads
          }
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
    
    // Check if all habits are completed after toggling
    const allCompleted = Object.values(newCompleted).every(Boolean) && 
                       Object.keys(newCompleted).length === 5;
    
    if (allCompleted) {
      // Show the congratulatory dialog
      setShowCompletionDialog(true);
    }
  };

  // Save current state to localStorage
  const saveToLocalStorage = (completedState: Record<string, boolean>) => {
    const today = new Date().toDateString();
    localStorage.setItem('habitTrackerData', JSON.stringify({
      date: today,
      completed: completedState
    }));
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setShowCompletionDialog(false);
    toast({
      title: "Great work!",
      description: "Keep up the good habits tomorrow!",
    });
  };

  // Calculate progress (always 5 total habits)
  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalHabits = 5;
  const progress = Math.round((completedCount / totalHabits) * 100);

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-medium tracking-tight">Daily Habits</h1>
          <p className="text-muted-foreground">{completedCount}/5 completed</p>
        </div>
        
        <ProgressRing 
          progress={progress} 
          size={100} 
          strokeWidth={8}
          showPercentage={true}
          className="shrink-0"
        />
      </div>
      
      <Progress 
        value={progress} 
        className="h-2 w-full" 
        aria-label="Habits completion progress"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {habits.map((habit) => {
          const isCompleted = completed[habit.id] || false;
          const Icon = habit.icon;
          
          return (
            <Card 
              key={habit.id}
              className={cn(
                "border transition-all duration-200 hover:shadow-md", 
                isCompleted ? "border-primary bg-primary/10" : ""
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    isCompleted ? "bg-primary text-primary-foreground" : "bg-secondary"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{habit.name}</span>
                      
                      <Button 
                        size="sm" 
                        variant={isCompleted ? "default" : "outline"}
                        className="rounded-full w-8 h-8 p-0"
                        onClick={() => toggleHabit(habit.id)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Complete</span>
                      </Button>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>{habit.description}</p>
                      <p className="font-medium text-green-600 mt-1">{habit.impact}</p>
                    </div>
                  </div>
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

      {/* Congratulatory Dialog */}
      <AlertDialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              Congratulations!
              <Award className="h-6 w-6 text-yellow-500" />
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <p className="text-lg mt-2">You have completed all your daily habits!</p>
              <div className="mt-4 py-2 bg-primary/10 rounded-md text-primary">
                <p className="font-medium">Environmental Impact Today:</p>
                <ul className="mt-2 text-sm space-y-1 text-left pl-4">
                  <li>• Saved 3.6kg of CO2 by biking</li>
                  <li>• Avoided 9g of plastic waste</li>
                  <li>• Reduced 2.1kg of CO2 by cold showering</li>
                  <li>• Diverted 1.8kg of waste from landfill</li>
                  <li>• Saved 1.4kg of CO2 through energy conservation</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose} className="w-full">
              Keep it up!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

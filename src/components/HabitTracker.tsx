
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Bike, Coffee, DropletIcon, Recycle, Lightbulb, Flower, Sun, Trash2, Wind, Battery } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface HabitItemProps {
  name: string;
  description: string;
  icon: React.ElementType;
  impact: string;
  completed?: boolean;
  onClick?: () => void;
}

function HabitItem({ name, description, icon: Icon, impact, completed, onClick }: HabitItemProps) {
  return (
    <Card className={cn('glass-card overflow-hidden transition-all duration-300', 
      completed ? 'border-primary/50 bg-primary/5' : 'hover:border-muted')}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            'flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center',
            completed ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{name}</h3>
              <Button 
                size="sm" 
                variant={completed ? "outline" : "ghost"} 
                className={cn(
                  'h-8 w-8 p-0 rounded-full',
                  completed ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90' : ''
                )}
                onClick={onClick}
              >
                <Check className="h-4 w-4" />
                <span className="sr-only">Complete</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex items-center pt-1">
              <span className="text-xs font-medium text-primary">{impact}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function HabitTracker() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [habitsForToday, setHabitsForToday] = useState<any[]>([]);

  useEffect(() => {
    // All possible habits
    const allHabits = [
      {
        id: 'biking',
        name: 'Bike to work',
        description: 'Use a bike instead of a car for your commute',
        icon: Bike,
        impact: 'Saves 3.6kg of CO2 emissions',
      },
      {
        id: 'reusable',
        name: 'Use reusable cup',
        description: 'Avoid disposable cups for your coffee or tea',
        icon: Coffee,
        impact: 'Saves 0.5kg of waste per week',
      },
      {
        id: 'water',
        name: 'Cold shower',
        description: 'Switch to cold showers',
        icon: DropletIcon,
        impact: 'Reduces water heating energy consumption',
      },
      {
        id: 'recycle',
        name: 'Recycled today',
        description: 'Properly sort and recycle your waste',
        icon: Recycle,
        impact: 'Reduces landfill waste by 30%',
      },
      {
        id: 'energy',
        name: 'Energy saver',
        description: 'Turn off lights and appliances when not in use',
        icon: Lightbulb,
        impact: 'Reduces energy consumption by 10%',
      },
      {
        id: 'plant',
        name: 'Plant a seed',
        description: 'Grow your own food or plants',
        icon: Flower,
        impact: 'Improves air quality and reduces food miles',
      },
      {
        id: 'solar',
        name: 'Solar usage',
        description: 'Use solar-powered devices when possible',
        icon: Sun,
        impact: 'Reduces reliance on grid electricity',
      },
      {
        id: 'waste',
        name: 'Zero waste meal',
        description: 'Prepare a meal with zero food waste',
        icon: Trash2,
        impact: 'Reduces food waste and saves resources',
      },
      {
        id: 'ventilation',
        name: 'Natural ventilation',
        description: 'Open windows instead of using air conditioning',
        icon: Wind,
        impact: 'Reduces electricity consumption significantly',
      },
      {
        id: 'electronics',
        name: 'Battery recycling',
        description: 'Properly dispose of used batteries',
        icon: Battery,
        impact: 'Prevents toxic materials from entering landfills',
      }
    ];

    // Load or initialize completed state
    const loadCompletedState = () => {
      const today = new Date().toDateString();
      const storedData = localStorage.getItem('habitTrackerData');
      
      if (storedData) {
        try {
          const { date, completed: storedCompleted, habits: storedHabits } = JSON.parse(storedData);
          
          if (date === today) {
            // Use stored data if it exists for today
            setCompleted(storedCompleted);
            setHabitsForToday(storedHabits);
            return;
          }
        } catch (error) {
          console.error('Error parsing stored habit data:', error);
        }
      }
      
      // Generate new habits for today
      const seed = new Date().getDate();
      const shuffled = [...allHabits].sort(() => 0.5 - Math.random());
      const selectedHabits = shuffled.slice(0, 5);
      
      // Initialize completed state
      const initialCompleted: Record<string, boolean> = {};
      selectedHabits.forEach((habit, index) => {
        // Randomly mark some as completed for demonstration
        initialCompleted[habit.id] = index < 2;
      });
      
      // Store the new data
      localStorage.setItem('habitTrackerData', JSON.stringify({
        date: today,
        completed: initialCompleted,
        habits: selectedHabits
      }));
      
      setCompleted(initialCompleted);
      setHabitsForToday(selectedHabits);
    };
    
    loadCompletedState();
  }, []);

  const toggleHabit = (id: string) => {
    const newCompleted = {
      ...completed,
      [id]: !completed[id]
    };
    
    setCompleted(newCompleted);
    
    // Update local storage
    const today = new Date().toDateString();
    localStorage.setItem('habitTrackerData', JSON.stringify({
      date: today,
      completed: newCompleted,
      habits: habitsForToday
    }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalHabits = habitsForToday.length;
  const progress = totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0;

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">Daily Habits</h1>
        <p className="text-muted-foreground">Track your sustainability habits</p>
      </div>

      <Card className="glass-card p-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <h3 className="font-medium">Today's Progress</h3>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{totalHabits} completed
            </span>
          </div>
          <Progress value={progress} className="h-2 w-full" />
        </div>
      </Card>
      
      <Separator className="my-6" />
      
      <div className="space-y-4">
        {habitsForToday.map((habit) => (
          <HabitItem
            key={habit.id}
            name={habit.name}
            description={habit.description}
            icon={habit.icon}
            impact={habit.impact}
            completed={completed[habit.id]}
            onClick={() => toggleHabit(habit.id)}
          />
        ))}
      </div>
    </section>
  );
}


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Bike, Coffee, DropletIcon, Recycle, Lightbulb } from 'lucide-react';
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
  const [completed, setCompleted] = React.useState({
    biking: false,
    reusable: true,
    water: false,
    recycle: true,
    energy: false,
  });

  const habits = [
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
      name: 'Short shower',
      description: 'Keep your shower under 5 minutes',
      icon: DropletIcon,
      impact: 'Saves up to 35L of water per shower',
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
  ];

  const toggleHabit = (id: string) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalHabits = habits.length;
  const progress = (completedCount / totalHabits) * 100;

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
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            name={habit.name}
            description={habit.description}
            icon={habit.icon}
            impact={habit.impact}
            completed={completed[habit.id as keyof typeof completed]}
            onClick={() => toggleHabit(habit.id)}
          />
        ))}
      </div>
    </section>
  );
}

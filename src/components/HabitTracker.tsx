
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Bike, Coffee, DropletIcon, Recycle, Lightbulb, Award, Upload, Image, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Habit {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  impact: string;
  verificationText: string;
  points: number;
}

export function HabitTracker() {
  const habits: Habit[] = [
    { 
      id: 'biking', 
      name: 'Bike to work', 
      icon: Bike,
      description: 'Use a bike instead of a car for your commute',
      impact: 'Saves 3.6kg of CO2 emissions',
      verificationText: 'Confirm that you commuted to work using a bicycle today',
      points: 30
    },
    { 
      id: 'reusable', 
      name: 'Use reusable cup', 
      icon: Coffee,
      description: 'Bring your own cup for coffee or drinks',
      impact: 'Saves 9g of plastic waste',
      verificationText: 'Confirm that you used a reusable cup for your beverages today',
      points: 10
    },
    { 
      id: 'water', 
      name: 'Take cold shower', 
      icon: DropletIcon,
      description: 'Reduce hot water usage by taking a cold shower',
      impact: 'Saves 2.1kg of CO2 emissions',
      verificationText: 'Confirm that you took a cold shower to save energy',
      points: 20
    },
    { 
      id: 'recycle', 
      name: 'Recycle today', 
      icon: Recycle,
      description: 'Properly sort and recycle all eligible waste',
      impact: 'Saves 1.8kg of landfill waste',
      verificationText: 'Confirm that you properly sorted and recycled your waste today',
      points: 15
    },
    { 
      id: 'energy', 
      name: 'Save energy', 
      icon: Lightbulb,
      description: 'Turn off lights and appliances when not in use',
      impact: 'Saves 1.4kg of CO2 emissions',
      verificationText: 'Confirm that you turned off lights and unplugged unused appliances',
      points: 20
    },
  ];

  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [verifyingHabit, setVerifyingHabit] = useState<Habit | null>(null);
  const [verificationImage, setVerificationImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('habitTrackerData');
    
    if (storedData) {
      try {
        const { date, completed: storedCompleted } = JSON.parse(storedData);
        
        if (date === today) {
          setCompleted(storedCompleted);
          
          const allCompleted = Object.values(storedCompleted).every(Boolean) && 
                             Object.keys(storedCompleted).length === 5;
          
          if (allCompleted) {
          }
        } else {
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

  const initializeHabits = () => {
    const initialCompleted: Record<string, boolean> = {};
    habits.forEach(habit => {
      initialCompleted[habit.id] = false;
    });
    
    setCompleted(initialCompleted);
    saveToLocalStorage(initialCompleted);
  };

  const resetHabits = () => {
    initializeHabits();
    toast({
      title: "Habits Reset",
      description: "All habits have been reset for today",
    });
  };

  const showVerification = (habit: Habit) => {
    setVerifyingHabit(habit);
    setVerificationImage(null);
    setVerificationStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setVerificationImage(e.target.result as string);
        setIsUploading(false);
        setVerificationStatus(null);
        
        toast({
          title: "Image uploaded",
          description: "Your verification photo has been uploaded",
        });
      }
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image",
        variant: "destructive",
      });
    };
    
    reader.readAsDataURL(file);
  };

  const resetVerificationState = () => {
    setVerifyingHabit(null);
    setVerificationImage(null);
    setVerificationStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const completeHabit = () => {
    if (!verifyingHabit) return;
    
    if (!verificationImage) {
      setVerificationStatus("Please upload an image");
      return;
    }
    
    setVerificationStatus("Ongoing Verification...");
    
    // Simulate verification process
    setTimeout(() => {
      const id = verifyingHabit.id;
      const newCompleted = {
        ...completed,
        [id]: true
      };
      
      setCompleted(newCompleted);
      
      console.log(`Verification image for ${verifyingHabit.name}:`, verificationImage);
      
      saveToLocalStorage(newCompleted);
      
      toast({
        title: "Habit verified!",
        description: `You've completed: ${verifyingHabit.name}`,
      });
      
      const allCompleted = Object.values(newCompleted).every(Boolean) && 
                         Object.keys(newCompleted).length === 5;
      
      if (allCompleted) {
        setShowCompletionDialog(true);
      }
      
      // Auto-close the dialog after 3 seconds
      setTimeout(() => {
        resetVerificationState();
      }, 3000);
      
    }, 1500);
  };

  const saveToLocalStorage = (completedState: Record<string, boolean>) => {
    const today = new Date().toDateString();
    localStorage.setItem('habitTrackerData', JSON.stringify({
      date: today,
      completed: completedState
    }));
  };

  const handleDialogClose = () => {
    setShowCompletionDialog(false);
    toast({
      title: "Great work!",
      description: "Keep up the good habits tomorrow!",
    });
  };

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
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={resetHabits}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Habits
          </Button>
          
          <ProgressRing 
            progress={progress} 
            size={100} 
            strokeWidth={8}
            showPercentage={true}
            className="shrink-0"
          />
        </div>
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
                "border transition-all duration-200 hover:shadow-md cursor-pointer", 
                isCompleted ? "border-primary bg-primary/10" : ""
              )}
              onClick={() => !isCompleted && showVerification(habit)}
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
                      <span className="font-medium">{habit.name} <span className="text-green-600 ml-1">({habit.points} pts)</span></span>
                      
                      {isCompleted ? (
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-primary text-primary-foreground">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : null}
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

      <Dialog 
        open={!!verifyingHabit} 
        onOpenChange={(open) => {
          if (!open) resetVerificationState();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Habit Completion</DialogTitle>
            <DialogDescription>
              {verifyingHabit?.verificationText}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center p-4 bg-secondary/50 rounded-md">
              <div className="mr-3">
                {verifyingHabit && React.createElement(verifyingHabit.icon, { className: "h-6 w-6 text-primary" })}
              </div>
              <div>
                <p className="font-medium">{verifyingHabit?.name} <span className="text-green-600 ml-1">({verifyingHabit?.points} pts)</span></p>
                <p className="text-sm text-muted-foreground">{verifyingHabit?.impact}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium">Upload verification photo</p>
              
              <div className="grid place-items-center border-2 border-dashed border-muted-foreground/25 rounded-md p-4 transition-colors hover:border-primary/50 cursor-pointer relative overflow-hidden"
                   onClick={() => fileInputRef.current?.click()}>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                
                {verificationImage ? (
                  <div className="w-full aspect-video relative">
                    <img 
                      src={verificationImage} 
                      alt="Verification" 
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVerificationImage(null);
                        setVerificationStatus(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-4">
                    {isUploading ? (
                      <div className="text-center">
                        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                      </div>
                    ) : (
                      <>
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-sm">Click to upload</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Upload a photo as evidence of your habit completion
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {verificationStatus && (
                <div className={cn(
                  "text-sm p-2 rounded-md text-center",
                  verificationStatus === "Please upload an image" 
                    ? "bg-destructive/10 text-destructive"
                    : "bg-yellow-500/10 text-yellow-600"
                )}>
                  {verificationStatus}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetVerificationState}>
              Cancel
            </Button>
            <Button 
              onClick={completeHabit}
              disabled={isUploading || verificationStatus === "Ongoing Verification..."}
            >
              Confirm Completion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

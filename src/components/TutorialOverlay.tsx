
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Leaf, 
  Award, 
  Users, 
  User, 
  Gift, 
  ArrowRight, 
  ArrowLeft, 
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const tutorialSteps = [
  {
    id: 'welcome',
    title: 'Welcome to EcoTracker!',
    description: 'Let\'s take a quick tour to help you get started on your sustainability journey.',
    icon: Home,
    position: 'center',
  },
  {
    id: 'dashboard',
    title: 'Home Dashboard',
    description: 'View your sustainability summary, upcoming challenges, and track your daily impact.',
    icon: Home,
    position: 'bottom',
    highlightSelector: '[data-nav="home"]',
  },
  {
    id: 'habits',
    title: 'Track Your Habits',
    description: 'Create and maintain eco-friendly habits. Regular tracking earns you eco-points!',
    icon: Leaf,
    position: 'bottom',
    highlightSelector: '[data-nav="habits"]',
  },
  {
    id: 'learn',
    title: 'Learn & Grow',
    description: 'Discover new ways to live sustainably through articles, tips and challenges.',
    icon: Award,
    position: 'bottom',
    highlightSelector: '[data-nav="learn"]',
  },
  {
    id: 'community',
    title: 'Join the Community',
    description: 'Connect with like-minded people and participate in group challenges.',
    icon: Users,
    position: 'bottom',
    highlightSelector: '[data-nav="community"]',
  },
  {
    id: 'profile',
    title: 'Your Profile',
    description: 'View your achievements, impact stats, and manage your account.',
    icon: User,
    position: 'bottom',
    highlightSelector: '[data-nav="profile"]',
  },
  {
    id: 'rewards',
    title: 'Redeem Your Points',
    description: 'Convert your eco-points into real-world rewards or environmental donations.',
    icon: Gift,
    position: 'top',
    highlightSelector: '[data-redeem-button]',
  },
  {
    id: 'finish',
    title: 'You\'re All Set!',
    description: 'Start your eco-friendly journey today. You can access this tutorial again from your profile settings.',
    icon: Award,
    position: 'center',
  },
];

interface TutorialOverlayProps {
  onComplete: () => void;
}

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tutorialSteps[currentStep];
  const [elementPosition, setElementPosition] = useState<{top: number; left: number; width: number; height: number} | null>(null);

  useEffect(() => {
    if (step.highlightSelector) {
      const element = document.querySelector(step.highlightSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setElementPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      } else {
        setElementPosition(null);
      }
    } else {
      setElementPosition(null);
    }

    // Add scroll to element if needed
    if (step.highlightSelector && step.position !== 'center') {
      const element = document.querySelector(step.highlightSelector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep, step.highlightSelector, step.position]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const handleComplete = () => {
    // Save tutorial completion status to localStorage
    localStorage.setItem('tutorialCompleted', 'true');
    onComplete();
  };

  const getTooltipPosition = () => {
    if (!elementPosition || step.position === 'center') {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }

    if (step.position === 'top') {
      return {
        top: `${elementPosition.top - 120}px`,
        left: `${elementPosition.left + elementPosition.width/2}px`,
        transform: 'translateX(-50%)',
      };
    }
    
    if (step.position === 'bottom') {
      return {
        top: `${elementPosition.top + elementPosition.height + 20}px`,
        left: `${elementPosition.left + elementPosition.width/2}px`,
        transform: 'translateX(-50%)',
      };
    }

    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  };

  const Icon = step.icon;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      >
        {/* Skip button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-4 right-4 z-50" 
          onClick={handleComplete}
        >
          <X className="h-4 w-4 mr-1" />
          Skip Tutorial
        </Button>

        {/* Highlight circle for elements */}
        {elementPosition && step.position !== 'center' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute z-10 rounded-full"
            style={{
              top: elementPosition.top - 8,
              left: elementPosition.left - 8,
              width: elementPosition.width + 16,
              height: elementPosition.height + 16,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
            }}
          />
        )}

        {/* Tutorial tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute z-50 glass-card p-6 rounded-xl shadow-lg max-w-md"
          style={{
            ...getTooltipPosition(),
            width: '90%',
            maxWidth: '350px',
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">{step.title}</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">{step.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {tutorialSteps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "w-2 h-2 rounded-full", 
                    idx === currentStep ? "bg-primary" : "bg-primary/30"
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              <Button onClick={handleNext}>
                {currentStep < tutorialSteps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  'Finish'
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

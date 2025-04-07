
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, CalendarCheck2, BookOpen, Trophy, User, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface TutorialStep {
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  target: string;
  icon?: React.ReactNode;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Welcome to EcoTracker!',
    description: 'Let us show you around the app and help you get started on your eco-friendly journey.',
    position: 'center',
    target: 'body',
    icon: <Trophy className="h-10 w-10 text-primary mb-2" />
  },
  {
    title: 'Home Dashboard',
    description: 'This is your dashboard with an overview of your eco-activities and current progress.',
    position: 'bottom',
    target: '[data-nav="home"]',
    icon: <Home className="h-6 w-6 text-primary mb-2" />
  },
  {
    title: 'Track Eco-Habits',
    description: 'Form and track daily eco-friendly habits to earn points and level up.',
    position: 'bottom',
    target: '[data-nav="habits"]',
    icon: <CalendarCheck2 className="h-6 w-6 text-primary mb-2" />
  },
  {
    title: 'Learn & Grow',
    description: 'Explore educational content about sustainability and environmental topics.',
    position: 'bottom',
    target: '[data-nav="learn"]',
    icon: <BookOpen className="h-6 w-6 text-primary mb-2" />
  },
  {
    title: 'Your Profile',
    description: 'Check your level, points, and achievements. You can also customize your settings here.',
    position: 'top',
    target: '[data-nav="profile"]',
    icon: <User className="h-6 w-6 text-primary mb-2" />
  },
  {
    title: 'Redeem Your Points',
    description: 'Don\'t forget to visit the rewards page to redeem your hard-earned points for eco-friendly rewards!',
    position: 'center',
    target: 'body',
    icon: <Trophy className="h-6 w-6 text-primary mb-2" />
  }
];

export const Tutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const tutorialRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Calculate position based on target element
  useEffect(() => {
    if (!isVisible) return;
    
    const step = tutorialSteps[currentStep];
    
    if (step.position === 'center') {
      setPosition({
        top: window.innerHeight / 2 - 150,
        left: window.innerWidth / 2 - 150,
        width: 300,
        height: 300
      });
      return;
    }
    
    const targetElement = document.querySelector(step.target);
    if (!targetElement) {
      console.error(`Target element not found: ${step.target}`);
      return;
    }
    
    const rect = targetElement.getBoundingClientRect();
    
    let top = 0;
    let left = 0;
    
    switch (step.position) {
      case 'top':
        top = rect.top - 120;
        left = rect.left + rect.width / 2 - 150;
        break;
      case 'bottom':
        top = rect.bottom + 20;
        left = rect.left + rect.width / 2 - 150;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - 100;
        left = rect.left - 320;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - 100;
        left = rect.right + 20;
        break;
    }
    
    // Ensure tutorial stays within viewport
    if (left < 20) left = 20;
    if (left > window.innerWidth - 320) left = window.innerWidth - 320;
    if (top < 20) top = 20;
    if (top > window.innerHeight - 200) top = window.innerHeight - 200;
    
    setPosition({ 
      top, 
      left, 
      width: 300, 
      height: 200 
    });
  }, [currentStep, isVisible]);
  
  // Highlight target element with overlay
  useEffect(() => {
    if (!isVisible) return;
    
    const step = tutorialSteps[currentStep];
    if (step.position === 'center') return;
    
    const targetElement = document.querySelector(step.target);
    if (!targetElement) return;
    
    // Add highlight class to target element
    targetElement.classList.add('tutorial-highlight');
    
    return () => {
      // Remove highlight when step changes
      targetElement.classList.remove('tutorial-highlight');
    };
  }, [currentStep, isVisible]);
  
  // Handle next step
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };
  
  // Skip tutorial and mark as completed
  const handleSkip = () => {
    completeTutorial();
  };
  
  // Mark tutorial as completed in user profile
  const completeTutorial = async () => {
    setIsVisible(false);
    
    if (user) {
      try {
        // Update user profile to mark tutorial as completed
        await supabase
          .from('profiles')
          .update({ tutorial_completed: true })
          .eq('id', user.id);
      } catch (error) {
        console.error('Failed to update tutorial status:', error);
      }
    }
    
    navigate('/');
  };
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 overflow-hidden">
        {/* Overlay with cutout for target element */}
        {tutorialSteps[currentStep].position !== 'center' && (
          <div className="absolute inset-0 pointer-events-none" />
        )}
        
        {/* Tutorial card */}
        <motion.div
          ref={tutorialRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bg-card backdrop-blur-md rounded-lg shadow-xl border border-primary/20 p-6 w-[300px] z-50"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-2 top-2 text-muted-foreground"
            onClick={handleSkip}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Progress indicator */}
          <div className="flex gap-1 mb-4">
            {tutorialSteps.map((_, index) => (
              <div 
                key={index} 
                className={`h-1 rounded-full flex-1 transition-colors ${
                  index === currentStep ? 'bg-primary' : 'bg-primary/20'
                }`} 
              />
            ))}
          </div>
          
          <div className="flex flex-col items-center text-center">
            {tutorialSteps[currentStep].icon}
            <h3 className="font-semibold text-lg mb-2">
              {tutorialSteps[currentStep].title}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {tutorialSteps[currentStep].description}
            </p>
            
            <div className="flex justify-between w-full">
              <Button 
                variant="outline" 
                onClick={handleSkip}
                size="sm"
              >
                Skip
              </Button>
              <Button 
                onClick={handleNext}
                size="sm"
              >
                {currentStep < tutorialSteps.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

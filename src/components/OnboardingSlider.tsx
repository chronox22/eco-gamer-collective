
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Leaf, TreeDeciduous, Cloud, BarChart2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: 'Eco-Friendly Habits',
    description: 'Start building sustainable routines and monitor the positive impact on our environment.',
    icon: <Leaf className="h-full w-full text-green-400" />
  },
  {
    title: 'Track Your Impact',
    description: 'Discover the metrics of your eco-friendly choices and see the positive change you make each day.',
    icon: <BarChart2 className="h-full w-full text-blue-500" />
  },
  {
    title: 'Join Our Community',
    description: 'Connect with eco-conscious individuals and share sustainable tips and achievements.',
    icon: <TreeDeciduous className="h-full w-full text-green-500" />
  }
];

interface OnboardingSliderProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingSlider = ({ onComplete, onSkip }: OnboardingSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="sm" className="text-foreground/70" onClick={onSkip}>
          Skip
        </Button>
      </div>

      {/* Content area */}
      <div className="flex-grow flex flex-col items-center justify-center px-8 pb-16">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* App logo */}
            <div className="flex items-center mb-4">
              <Cloud className="h-6 w-6 text-green-500 mr-1" />
              <span className="text-lg font-semibold text-green-600">ChronoX</span>
            </div>

            {/* Illustration */}
            <div className="relative mb-8 h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-xl" />
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="h-32 w-32">
                  {slides[currentSlide].icon}
                </div>
              </div>
            </div>

            {/* Text content */}
            <h2 className="text-xl font-bold mb-2">{slides[currentSlide].title}</h2>
            <p className="text-muted-foreground text-center max-w-xs">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-4">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-primary" : "w-2 bg-primary/30"
            }`}
          />
        ))}
      </div>

      {/* Next button */}
      <div className="px-8 pb-6">
        <Button 
          className="w-full bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white group" 
          onClick={nextSlide}
        >
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

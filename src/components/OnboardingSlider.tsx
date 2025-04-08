
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Leaf, TreeDeciduous, Cloud, BarChart2, X, Sprout, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: 'Eco-Friendly Habits',
    description: 'Start building sustainable routines and monitor the positive impact on our environment.',
    icon: <Leaf className="h-full w-full text-green-400" />,
    color: "from-green-400/20 to-emerald-300/20"
  },
  {
    title: 'Track Your Impact',
    description: 'Discover the metrics of your eco-friendly choices and see the positive change you make each day.',
    icon: <BarChart2 className="h-full w-full text-blue-500" />,
    color: "from-blue-400/20 to-sky-300/20"
  },
  {
    title: 'Join Our Community',
    description: 'Connect with eco-conscious individuals and share sustainable tips and achievements.',
    icon: <Users className="h-full w-full text-emerald-500" />,
    color: "from-emerald-400/20 to-teal-300/20"
  },
  {
    title: 'Earn Eco-points',
    description: 'Redeem your rewards for making sustainable choices and contributing to a greener planet.',
    icon: <Sprout className="h-full w-full text-green-500" />,
    color: "from-green-500/20 to-lime-300/20"
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
    <div className="h-full flex flex-col relative">
      {/* Decorative elements */}
      <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-gradient-to-br from-green-400/10 to-blue-300/5 blur-xl"></div>
      <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/10 to-emerald-300/5 blur-xl"></div>

      {/* Skip button */}
      <div className="flex justify-end p-4">
        <motion.button 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variant="ghost" 
          size="sm" 
          className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1 px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm" 
          onClick={onSkip}
        >
          Skip <X className="h-3.5 w-3.5 ml-1" />
        </motion.button>
      </div>

      {/* Content area */}
      <div className="flex-grow flex flex-col items-center justify-center px-8 pb-16">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center text-center"
          >
            {/* App logo */}
            <motion.div 
              className="flex items-center mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Cloud className="h-6 w-6 text-green-500 mr-1" />
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">ChronoX</span>
            </motion.div>

            {/* Illustration */}
            <motion.div 
              className="relative mb-10 h-48 w-48"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} rounded-full blur-xl transform animate-pulse-slow`} />
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="h-32 w-32 transform transition-transform duration-700 hover:scale-110">
                  {slides[currentSlide].icon}
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
            </motion.div>

            {/* Text content */}
            <motion.h2 
              className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {slides[currentSlide].title}
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-center max-w-xs text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-6">
        {slides.map((_, index) => (
          <motion.div 
            key={index} 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: currentSlide === index ? 1 : 0.8, 
              opacity: currentSlide === index ? 1 : 0.5 
            }}
            transition={{ duration: 0.3 }}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-gradient-to-r from-green-400 to-emerald-500" : "w-2 bg-primary/30"
            }`}
            onClick={() => setCurrentSlide(index)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Next button */}
      <div className="px-8 pb-8 absolute bottom-0 left-0 right-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button 
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white group shadow-lg shadow-green-500/20 border-none auth-button"
            onClick={nextSlide}
          >
            <span className="text-base">{currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}</span>
            <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};


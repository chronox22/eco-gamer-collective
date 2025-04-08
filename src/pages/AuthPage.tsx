
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthForm } from '@/components/AuthForm';
import { OnboardingSlider } from '@/components/OnboardingSlider';
import { toast } from 'sonner';
import { Leaf, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [wasOnboarded, setWasOnboarded] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasOnboarded = localStorage.getItem('onboarded');
    if (hasOnboarded === 'true') {
      setShowOnboarding(false);
      setWasOnboarded(true);
    }

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/', { replace: true });
      } else {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/', { replace: true });
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarded', 'true');
    setShowOnboarding(false);
    setWasOnboarded(true);
  };

  const handleShowOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleBackToAuth = () => {
    setShowOnboarding(false);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse h-8 w-8 rounded-full bg-primary/50"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-blue-900/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969')] bg-cover bg-center opacity-60 z-0"></div>
        
        {/* Floating elements - leaves and nature elements */}
        <div className="leaf absolute h-12 w-12 rounded-full bg-green-500/20 backdrop-blur-sm animate-float-slow left-[10%] top-[15%]"></div>
        <div className="leaf absolute h-16 w-16 rounded-full bg-green-400/20 backdrop-blur-sm animate-float-medium left-[75%] top-[20%]"></div>
        <div className="leaf absolute h-8 w-8 rounded-full bg-green-300/20 backdrop-blur-sm animate-float-fast left-[25%] top-[60%]"></div>
        <div className="leaf absolute h-20 w-20 rounded-full bg-blue-500/20 backdrop-blur-sm animate-float-medium left-[60%] top-[70%]"></div>
        <div className="leaf absolute h-14 w-14 rounded-full bg-teal-400/20 backdrop-blur-sm animate-float-slow left-[15%] top-[40%]"></div>
        
        {/* Light beams */}
        <div className="absolute top-0 left-1/4 w-64 h-96 bg-green-400/10 blur-3xl transform -rotate-12 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-96 bg-blue-400/10 blur-3xl transform rotate-12 animate-pulse-slow"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 z-10 animate-fade-in">
        <AnimatePresence mode="wait" initial={false}>
          {showOnboarding ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md h-[600px] bg-background/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl"
            >
              {wasOnboarded && (
                <div className="absolute top-4 left-4 z-20">
                  <button 
                    onClick={handleBackToAuth}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              )}
              <OnboardingSlider 
                onComplete={handleOnboardingComplete} 
                onSkip={handleOnboardingComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="mb-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Leaf className="h-8 w-8 text-green-400 mr-2" />
                  <h1 className="text-2xl font-bold text-white">Welcome to ChronoX</h1>
                </div>
                <p className="text-white/80">Track your eco-friendly habits and make a difference</p>
              </div>
              
              <AuthForm />
              
              {wasOnboarded && (
                <div className="mt-6 text-center">
                  <button 
                    onClick={handleShowOnboarding} 
                    className="text-white/70 hover:text-white text-sm underline underline-offset-4"
                  >
                    View intro again
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthForm } from '@/components/AuthForm';
import { OnboardingSlider } from '@/components/OnboardingSlider';
import { toast } from 'sonner';
import { Leaf, ArrowLeft, Cloud, TreeDeciduous, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChronoXLogo from '/chrono-x-logo.png';  // Import the logo

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
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 relative">
            <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></div>
            <div className="relative h-full w-full rounded-full bg-green-500/80 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-green-500 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/80 to-blue-900/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969')] bg-cover bg-center opacity-60 z-0"></div>
        
        {/* Floating elements - leaves and nature elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
          className="leaf absolute h-12 w-12 rounded-full bg-green-500/20 backdrop-blur-sm left-[10%] top-[15%]"
        >
          <Leaf className="h-full w-full text-green-300/60" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.5, duration: 0.8 }}
          className="leaf absolute h-16 w-16 rounded-full bg-green-400/20 backdrop-blur-sm left-[75%] top-[20%]"
        >
          <TreeDeciduous className="h-full w-full text-green-200/60" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.7, duration: 0.8 }}
          className="leaf absolute h-8 w-8 rounded-full bg-green-300/20 backdrop-blur-sm left-[25%] top-[60%]"
        >
          <Sprout className="h-full w-full text-green-400/60" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.9, duration: 0.8 }}
          className="leaf absolute h-20 w-20 rounded-full bg-blue-500/20 backdrop-blur-sm left-[60%] top-[70%]"
        >
          <Cloud className="h-full w-full text-blue-200/60" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 1.1, duration: 0.8 }}
          className="leaf absolute h-14 w-14 rounded-full bg-teal-400/20 backdrop-blur-sm left-[15%] top-[40%]"
        >
          <Leaf className="h-full w-full text-teal-300/60 rotate-45" />
        </motion.div>
        
        {/* Light beams */}
        <div className="absolute top-0 left-1/4 w-64 h-96 bg-green-400/10 blur-3xl transform -rotate-12 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-96 bg-blue-400/10 blur-3xl transform rotate-12 animate-pulse-slow"></div>
      </motion.div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 z-10 animate-fade-in">
        <AnimatePresence mode="wait" initial={false}>
          {showOnboarding ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="w-full max-w-md h-[600px] bg-gradient-to-br from-background/95 to-background/85 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              {wasOnboarded && (
                <div className="absolute top-4 left-4 z-20">
                  <motion.button 
                    onClick={handleBackToAuth}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors shadow-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </motion.button>
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
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="w-full max-w-md"
            >
              <motion.div 
                className="mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div 
                  className="flex items-center justify-center mb-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={https://scontent.fmnl17-5.fna.fbcdn.net/v/t1.15752-9/484016871_1795539701015523_1392230472783915642_n.png?_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeG8moZ5XJmd1h3EskrfnPq4ReYhi0s2ZEhF5iGLSzZkSNdQNUFoBB4FJgEyS31GRAvHjXXsY8ig07ALTBG5Xlsv&_nc_ohc=f_wU71ca-EYQ7kNvwED3D8_&_nc_oc=AdlJeiSrRaqB6o3EVaREyTbGVOv26wrcxgvr7Sbomhl6u2tL1G8NXRpNk2Ac6C1R37A&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&oh=03_Q7cD2AH4mJvCMooFPCRTtEpIGaojmhU3NAUszrv2nez-LKk81A&oe=681DD04B} 
                    alt="ChronoX Logo" 
                    className="h-14 w-14 mr-3" 
                  />
                  <motion.h1 
                    className="text-3xl font-bold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">
                      Welcome to ChronoX
                    </span>
                  </motion.h1>
                </motion.div>
                <motion.p 
                  className="text-white/90 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Track your eco-friendly habits and make a difference
                </motion.p>
              </motion.div>
              
              <AuthForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthForm } from '@/components/AuthForm';
import { toast } from 'sonner';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        
        {/* Floating elements */}
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
        <AuthForm />
        
        <div className="mt-16 text-center text-foreground/90 font-medium max-w-md px-4 text-base leading-relaxed">
          Join our community and start making a positive impact on the environment today. Together, we can create meaningful change.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

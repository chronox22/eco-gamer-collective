
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { ReminderNotification } from '@/components/ReminderNotification';
import { TutorialOverlay } from '@/components/TutorialOverlay';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const checkIfFirstTimeUser = () => {
      // Only show tutorial if user is authenticated
      if (user) {
        const tutorialCompleted = localStorage.getItem('tutorialCompleted');
        if (!tutorialCompleted) {
          // Delay showing the tutorial slightly to ensure navigation elements are rendered
          setTimeout(() => {
            setShowTutorial(true);
          }, 500);
        }
      }
    };
    
    checkIfFirstTimeUser();
  }, [user]);
  
  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true');
  };
  
  return (
    <Layout>
      <ReminderNotification />
      <Dashboard />
      {showTutorial && <TutorialOverlay onComplete={handleTutorialComplete} />}
    </Layout>
  );
};

export default Index;


import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { ReminderNotification } from '@/components/ReminderNotification';
import { TutorialOverlay } from '@/components/TutorialOverlay';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  
  useEffect(() => {
    const checkIfFirstTimeUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session) {
        const tutorialCompleted = localStorage.getItem('tutorialCompleted');
        if (!tutorialCompleted) {
          setShowTutorial(true);
        }
      }
    };
    
    checkIfFirstTimeUser();
  }, []);
  
  const handleTutorialComplete = () => {
    setShowTutorial(false);
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

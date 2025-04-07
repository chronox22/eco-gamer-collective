
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { Tutorial } from '@/components/Tutorial';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const { user, profile } = useAuth();
  
  useEffect(() => {
    const checkTutorialStatus = async () => {
      if (user && profile) {
        const tutorialCompleted = profile.tutorial_completed ?? false;
        
        if (!tutorialCompleted) {
          setShowTutorial(true);
        }
      }
    };
    
    checkTutorialStatus();
  }, [user, profile]);

  return (
    <Layout>
      <Dashboard />
      {showTutorial && <Tutorial />}
    </Layout>
  );
};

export default Index;

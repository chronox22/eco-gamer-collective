
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { Tutorial } from '@/components/Tutorial';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const { user, profile } = useAuth();
  
  useEffect(() => {
    const checkTutorialStatus = async () => {
      if (user && profile) {
        // Only show tutorial if user is new and tutorial_completed is explicitly false
        // This ensures existing users who have null value don't see the tutorial
        const shouldShowTutorial = profile.tutorial_completed === false;
        setShowTutorial(shouldShowTutorial);
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

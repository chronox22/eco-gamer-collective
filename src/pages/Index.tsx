
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
        // Check if user has completed tutorial before
        const hasTutorialField = Object.prototype.hasOwnProperty.call(profile, 'tutorial_completed');
        const tutorialCompleted = hasTutorialField ? profile.tutorial_completed : false;
        
        if (!tutorialCompleted) {
          setShowTutorial(true);
          
          // If the profile doesn't have the tutorial_completed field yet, add it
          if (!hasTutorialField) {
            try {
              await supabase
                .from('profiles')
                .update({ tutorial_completed: false })
                .eq('id', user.id);
            } catch (error) {
              console.error('Failed to update profile with tutorial field:', error);
            }
          }
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

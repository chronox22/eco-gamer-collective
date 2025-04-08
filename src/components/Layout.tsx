
import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { addTutorialAttributes } from './TutorialHelpers';
import { useLocation } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  useEffect(() => {
    // Add data-nav attributes to navigation items for the tutorial
    addTutorialAttributes();
  }, []);

  // Effect to scroll to top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-full min-h-screen pb-16">
      <main className="flex-1 container max-w-lg mx-auto px-4 pt-4 pb-20">
        {children}
      </main>
      <Navigation />
    </div>
  );
}

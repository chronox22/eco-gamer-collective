
import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { addTutorialAttributes } from './TutorialHelpers';

export function Layout({ children }) {
  useEffect(() => {
    // Add data-nav attributes to navigation items for the tutorial
    addTutorialAttributes();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen pb-16">
      <main className="flex-1 container max-w-lg mx-auto px-4 pt-4 pb-20">
        {children}
      </main>
      <Navigation />
    </div>
  );
}

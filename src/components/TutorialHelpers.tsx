
import React from 'react';

// Add data-nav attributes to navigation items
export const addTutorialAttributes = () => {
  // Apply these attributes when the component mounts
  setTimeout(() => {
    // Get navigation elements
    const homeNav = document.querySelector('a[href="/"]');
    const habitsNav = document.querySelector('a[href="/habits"]');
    const learnNav = document.querySelector('a[href="/learn"]');
    const profileNav = document.querySelector('a[href="/profile"]');
    
    // Add data attributes for tutorial targeting
    if (homeNav) homeNav.setAttribute('data-nav', 'home');
    if (habitsNav) habitsNav.setAttribute('data-nav', 'habits');
    if (learnNav) learnNav.setAttribute('data-nav', 'learn');
    if (profileNav) profileNav.setAttribute('data-nav', 'profile');
  }, 100);
};

// Add a tutorial restart button in the profile settings
export const TutorialRestartButton: React.FC<{
  onClick: () => void;
  className?: string;
}> = ({ onClick, className = '' }) => {
  return (
    <button 
      className={`flex items-center text-sm text-muted-foreground hover:text-primary transition-colors ${className}`}
      onClick={onClick}
    >
      Restart Tutorial
    </button>
  );
};

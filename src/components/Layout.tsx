
import React from 'react';
import { Navigation } from './Navigation';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className={cn('flex-1 p-6 pb-24 max-w-md mx-auto w-full', className)}>
        {children}
      </main>
      <Navigation />
    </div>
  );
}

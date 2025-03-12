
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Leaf, Award, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Habits', path: '/habits', icon: Leaf },
  { name: 'Learn', path: '/learn', icon: Award },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Profile', path: '/profile', icon: User },
];

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 glass-card border-t py-3 px-4">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-300',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.name}</span>
              {isActive && (
                <div className="absolute bottom-[calc(100%-0.25rem)] left-1/2 w-1 h-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

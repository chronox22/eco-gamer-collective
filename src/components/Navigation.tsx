import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CalendarCheck2, BookOpen, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

function NavigationItem({ href, icon: Icon, label, active }: NavigationItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
        active
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground'
      )}
      data-nav={href === '/' ? 'home' : href.replace('/', '')}
    >
      <Icon className={cn('h-5 w-5', active && 'text-primary')} />
      <span>{label}</span>
    </Link>
  );
}

export function Navigation() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around border-t bg-background/80 backdrop-blur-md">
      <NavigationItem
        href="/"
        icon={Home}
        label="Home"
        active={pathname === '/'}
      />
      <NavigationItem
        href="/habits"
        icon={CalendarCheck2}
        label="Habits"
        active={pathname === '/habits'}
      />
      <NavigationItem
        href="/learn"
        icon={BookOpen}
        label="Learn"
        active={pathname === '/learn'}
      />
      <NavigationItem
        href="/community"
        icon={Users}
        label="Community"
        active={pathname === '/community'}
      />
      <NavigationItem
        href="/profile"
        icon={User}
        label="Profile"
        active={pathname === '/profile'}
      />
    </div>
  );
}

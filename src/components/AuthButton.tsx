
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useAuth, useUser, SignInButton, UserButton } from '@clerk/clerk-react';

export function AuthButton() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  if (isSignedIn && user) {
    return (
      <UserButton
        appearance={{
          elements: {
            userButtonBox: "h-9 w-9",
            userButtonTrigger: "h-9 w-9 ring-offset-background",
            userButtonPopoverCard: "glass-card shadow-md border border-primary/20",
          }
        }}
      />
    );
  }
  
  return (
    <SignInButton mode="modal">
      <Button variant="outline" size="sm" className="gap-2">
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
    </SignInButton>
  );
}

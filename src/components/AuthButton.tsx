
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

// Check if Clerk is available
const clerkAvailable = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? true : false;

// Conditionally import Clerk hooks and components
let ClerkComponents: any = {};
if (clerkAvailable) {
  // Import dynamically only if Clerk is available
  // This prevents errors when Clerk is not available
  import('@clerk/clerk-react').then((clerk) => {
    ClerkComponents = {
      useAuth: clerk.useAuth,
      useUser: clerk.useUser,
      SignInButton: clerk.SignInButton,
      UserButton: clerk.UserButton
    };
  });
}

export function AuthButton() {
  // If Clerk is not available, show a demo button
  if (!clerkAvailable) {
    return (
      <Button variant="outline" size="sm" className="gap-2">
        <LogIn className="h-4 w-4" />
        Demo Mode
      </Button>
    );
  }
  
  // If Clerk is available, try to use it
  try {
    const { isSignedIn } = ClerkComponents.useAuth?.() || { isSignedIn: false };
    const { user } = ClerkComponents.useUser?.() || { user: null };
    
    if (isSignedIn && user) {
      return (
        <ClerkComponents.UserButton
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
      <ClerkComponents.SignInButton mode="modal">
        <Button variant="outline" size="sm" className="gap-2">
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </ClerkComponents.SignInButton>
    );
  } catch (error) {
    // Fallback in case of any errors with Clerk
    console.error("Error rendering AuthButton with Clerk:", error);
    return (
      <Button variant="outline" size="sm" className="gap-2">
        <LogIn className="h-4 w-4" />
        Demo Mode
      </Button>
    );
  }
}

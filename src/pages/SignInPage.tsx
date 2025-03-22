
import React from 'react';
import { Layout } from '@/components/Layout';

// Check if Clerk is available
const clerkAvailable = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? true : false;

// Conditionally import Clerk components
let SignIn: any;
if (clerkAvailable) {
  try {
    const clerk = require('@clerk/clerk-react');
    SignIn = clerk.SignIn;
  } catch (error) {
    console.error("Failed to import Clerk components:", error);
  }
}

const SignInPage = () => {
  if (!clerkAvailable) {
    return (
      <Layout className="flex items-center justify-center">
        <div className="w-full max-w-sm p-6 glass-card shadow-md border border-primary/20">
          <h2 className="text-xl font-bold text-primary mb-4">Demo Mode</h2>
          <p className="text-muted-foreground mb-4">
            Authentication is not available in demo mode. Please set up Clerk to enable authentication.
          </p>
          <p className="text-sm text-muted-foreground">
            Set the <code>VITE_CLERK_PUBLISHABLE_KEY</code> environment variable to enable authentication.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="flex items-center justify-center">
      <div className="w-full max-w-sm">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "glass-card shadow-md border border-primary/20",
              headerTitle: "text-primary text-xl",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "border border-primary/20 hover:bg-primary/5",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              footerAction: "text-muted-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput: "border border-primary/20 rounded-md",
              footer: "text-center text-sm",
            }
          }}
        />
      </div>
    </Layout>
  );
};

export default SignInPage;


import React from 'react';
import { Layout } from '@/components/Layout';
import { Profile } from '@/components/Profile';

// Check if Clerk is available
const clerkAvailable = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? true : false;

// Conditionally import Clerk components
let SignedIn: any, SignedOut: any, RedirectToSignIn: any;
if (clerkAvailable) {
  try {
    const clerk = require('@clerk/clerk-react');
    SignedIn = clerk.SignedIn;
    SignedOut = clerk.SignedOut;
    RedirectToSignIn = clerk.RedirectToSignIn;
  } catch (error) {
    console.error("Failed to import Clerk components:", error);
  }
}

const ProfilePage = () => {
  // If Clerk is not available, render the profile directly
  if (!clerkAvailable) {
    return (
      <Layout>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Demo Mode</h2>
          <p className="mb-4">Running in demo mode without authentication.</p>
          <Profile />
        </div>
      </Layout>
    );
  }

  // If Clerk is available, use authentication
  return (
    <Layout>
      <SignedIn>
        <Profile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Layout>
  );
};

export default ProfilePage;

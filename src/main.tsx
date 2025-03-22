
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';

// Get the publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if we have a publishable key
const hasClerkCredentials = !!PUBLISHABLE_KEY;

// Render the app with or without ClerkProvider based on availability of credentials
if (hasClerkCredentials) {
  // If we have credentials, use ClerkProvider
  createRoot(document.getElementById("root")!).render(
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      signInForceRedirectUrl="/"
      signUpForceRedirectUrl="/"
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  );
} else {
  // If no credentials, render without ClerkProvider
  console.warn("No Clerk publishable key found. Running in demo mode without authentication.");
  createRoot(document.getElementById("root")!).render(<App />);
}


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HabitsPage from "./pages/HabitsPage";
import LearnPage from "./pages/LearnPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";

// Check if Clerk is available
const clerkAvailable = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? true : false;

// Conditionally import Clerk components
let ClerkComponents: any = {};
if (clerkAvailable) {
  try {
    const clerk = require('@clerk/clerk-react');
    ClerkComponents = {
      ClerkLoaded: clerk.ClerkLoaded,
      ClerkLoading: clerk.ClerkLoading
    };
  } catch (error) {
    console.error("Failed to import Clerk components:", error);
  }
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {clerkAvailable ? (
          <>
            <ClerkComponents.ClerkLoading>
              <div className="h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            </ClerkComponents.ClerkLoading>
            <ClerkComponents.ClerkLoaded>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/sign-in/*" element={<SignInPage />} />
                <Route path="/sign-up/*" element={<SignUpPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ClerkComponents.ClerkLoaded>
          </>
        ) : (
          // Render routes directly when Clerk is not available
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

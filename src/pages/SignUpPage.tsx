
import React from 'react';
import { Layout } from '@/components/Layout';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <Layout className="flex items-center justify-center">
      <div className="w-full max-w-sm">
        <SignUp
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

export default SignUpPage;

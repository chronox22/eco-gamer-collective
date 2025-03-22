
import React from 'react';
import { Layout } from '@/components/Layout';
import { Profile } from '@/components/Profile';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const ProfilePage = () => {
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

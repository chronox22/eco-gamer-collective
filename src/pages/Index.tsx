
import React from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { ReminderNotification } from '@/components/ReminderNotification';

const Index = () => {
  return (
    <Layout>
      <ReminderNotification />
      <Dashboard />
    </Layout>
  );
};

export default Index;


import React from 'react';
import { Layout } from '@/components/Layout';
import { HabitTracker } from '@/components/HabitTracker';
import { ReminderNotification } from '@/components/ReminderNotification';

const HabitsPage = () => {
  return (
    <Layout>
      <ReminderNotification />
      <div className="max-w-4xl mx-auto">
        <HabitTracker />
      </div>
    </Layout>
  );
};

export default HabitsPage;

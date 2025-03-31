
import React from 'react';
import { Layout } from '@/components/Layout';
import { HabitTracker } from '@/components/HabitTracker';

const HabitsPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <HabitTracker />
      </div>
    </Layout>
  );
};

export default HabitsPage;

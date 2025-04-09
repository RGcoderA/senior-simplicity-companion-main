
import React from 'react';
import MedicationReminder from '@/components/dashboard/MedicationReminder';
import ActivitySummary from '@/components/dashboard/ActivitySummary';
import QuickCall from '@/components/dashboard/QuickCall';
import NewsCard from '@/components/dashboard/NewsCard';
import HealthDeviceConnect from '@/components/dashboard/HealthDeviceConnect';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const isMobile = useIsMobile();
  
  return (
    <div>
      <h1 className="text-elder-xl font-bold text-companion-dark mb-6">Welcome, Susan</h1>
      
      <MedicationReminder />
      
      {isMobile ? (
        <div className="space-y-6">
          <HealthDeviceConnect />
          <ActivitySummary />
          <QuickCall />
          <NewsCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <HealthDeviceConnect />
            <ActivitySummary />
            <QuickCall />
          </div>
          <div>
            <NewsCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

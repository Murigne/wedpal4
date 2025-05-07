
import React from 'react';
import { cn } from '@/lib/utils';
import WeddingProgressTracker from '@/components/WeddingProgressTracker';
import QuickActions from '@/components/dashboard/QuickActions';
import ActivitySummary from '@/components/dashboard/ActivitySummary';
import LastUpdateBanner from '@/components/dashboard/LastUpdateBanner';

interface DashboardMainContentProps {
  sidebarExpanded: boolean;
  tasks: any[];
  weddingPlans: any[];
  preferredBudget: string;
  userPreferences: {
    indoor: boolean;
    outdoor: boolean;
    formal: boolean;
    seasonal: string;
  };
  weddingColors: string[];
  lastUpdate?: {
    user: string;
    action: string;
    timestamp: string;
    screen: string;
  };
}

const DashboardMainContent: React.FC<DashboardMainContentProps> = ({
  sidebarExpanded,
  tasks,
  weddingPlans,
  preferredBudget,
  userPreferences,
  weddingColors,
  lastUpdate
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-[1600px] mx-auto transition-all duration-300",
      sidebarExpanded ? "pr-0" : ""
    )}>
      <div className="lg:col-span-9 space-y-5">
        {lastUpdate && <LastUpdateBanner lastUpdate={lastUpdate} />}
        
        <ActivitySummary 
          weddingPlans={weddingPlans}
          preferredBudget={preferredBudget}
        />
      </div>
      
      <div className="lg:col-span-3 space-y-5">
        <WeddingProgressTracker tasks={tasks} className="w-full" />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardMainContent;

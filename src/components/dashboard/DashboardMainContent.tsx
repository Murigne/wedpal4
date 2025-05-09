
import React from 'react';
import { cn } from '@/lib/utils';
import WeddingProgressTracker from '@/components/WeddingProgressTracker';
import WeddingTemplates from '@/components/WeddingTemplates';
import QuickActions from '@/components/dashboard/QuickActions';
import RecommendedWeddingPlans from '@/components/dashboard/RecommendedWeddingPlans';
import SuccessStories from '@/components/dashboard/SuccessStories';

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
}

const DashboardMainContent: React.FC<DashboardMainContentProps> = ({
  sidebarExpanded,
  tasks,
  weddingPlans,
  preferredBudget,
  userPreferences,
  weddingColors
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-[1600px] mx-auto transition-all duration-300",
      sidebarExpanded ? "pr-0" : ""
    )}>
      <div className="lg:col-span-9 space-y-5">
        <RecommendedWeddingPlans 
          weddingPlans={weddingPlans}
          preferredBudget={preferredBudget}
        />
        
        <SuccessStories />
      </div>
      
      <div className="lg:col-span-3 space-y-5">
        {/* Swapped these two components as requested */}
        <QuickActions />
        
        <WeddingProgressTracker tasks={tasks} className="w-full" />
      </div>
    </div>
  );
};

export default DashboardMainContent;

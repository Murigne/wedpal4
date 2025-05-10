
import React from 'react';
import { cn } from '@/lib/utils';
import WeddingProgressTracker from '@/components/WeddingProgressTracker';
import WeddingTemplates from '@/components/WeddingTemplates';
import QuickActions from '@/components/dashboard/QuickActions';
import RecommendedWeddingPlans from '@/components/dashboard/RecommendedWeddingPlans';
import SuccessStories from '@/components/dashboard/SuccessStories';
import { GuestStats } from '@/types/guest';

interface DashboardMainContentProps {
  sidebarExpanded: boolean;
  tasks: any[];
  preferredBudget: string;
  userPreferences: {
    indoor: boolean;
    outdoor: boolean;
    formal: boolean;
    seasonal: string;
  };
  weddingColors: string[];
  guestStats: GuestStats;
  recentActivities: { action: string; date: string; userName: string }[];
  budgetSummary: {
    total: number;
    spent: number;
    remaining: number;
  };
}

const DashboardMainContent: React.FC<DashboardMainContentProps> = ({
  sidebarExpanded,
  tasks,
  preferredBudget,
  userPreferences,
  weddingColors,
  guestStats,
  recentActivities,
  budgetSummary
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-[1600px] mx-auto transition-all duration-300",
      sidebarExpanded ? "pr-0" : ""
    )}>
      <div className="lg:col-span-9 space-y-5">
        <RecommendedWeddingPlans 
          preferredBudget={preferredBudget}
        />
        
        <SuccessStories />
      </div>
      
      <div className="lg:col-span-3 space-y-5">
        <QuickActions />
        
        <WeddingProgressTracker tasks={tasks} className="w-full" />
      </div>
    </div>
  );
};

export default DashboardMainContent;

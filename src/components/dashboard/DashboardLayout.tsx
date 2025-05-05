
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import HeartAnimation from '@/components/HeartAnimation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import NavigationSidebar from '@/components/dashboard/NavigationSidebar';

interface DashboardLayoutProps {
  userName: string;
  partnerName: string;
  sidebarExpanded: boolean;
  onSidebarExpandChange: (expanded: boolean) => void;
  children: ReactNode;
  isLoading?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userName,
  partnerName,
  sidebarExpanded,
  onSidebarExpandChange,
  children,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient dynamic-gradient">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <p className="text-lg">Loading your wedding dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavigationSidebar onExpandChange={onSidebarExpandChange} />
      
      <div className="w-full animated-gradient dynamic-gradient relative">
        <HeartAnimation avoidTextAreas={true} count={10} />
        
        <DashboardHeader userName={userName} partnerName={partnerName} />
        
        <main className={cn(
          "w-full px-4 md:px-6 py-8 transition-all duration-300",
          sidebarExpanded ? "ml-[180px]" : "ml-[60px]"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

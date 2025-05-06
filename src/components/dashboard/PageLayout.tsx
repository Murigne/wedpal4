
import React, { useState, ReactNode } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useDashboardData } from '@/hooks/useDashboardData';

interface PageLayoutProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  icon,
  children
}) => {
  const { user } = useAuth();
  const dashboardData = useDashboardData();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  // Handle sidebar expansion
  const handleSidebarExpandChange = (expanded: boolean) => {
    setSidebarExpanded(expanded);
  };
  
  return (
    <DashboardLayout 
      userName={dashboardData.userName}
      partnerName={dashboardData.partnerName}
      sidebarExpanded={sidebarExpanded}
      onSidebarExpandChange={handleSidebarExpandChange}
      isLoading={dashboardData.isLoading}
    >
      <div className="mb-8 text-white max-w-[1600px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2 flex items-center gap-2">
          {icon}
          {title}
        </h1>
        {description && (
          <p className="text-white/80">{description}</p>
        )}
      </div>
      
      <div className={cn(
        "max-w-[1600px] mx-auto transition-all duration-300",
        sidebarExpanded ? "pr-0" : ""
      )}>
        {children}
      </div>
    </DashboardLayout>
  );
};

export default PageLayout;

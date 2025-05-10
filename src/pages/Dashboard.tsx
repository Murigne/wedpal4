
import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardWelcomeHeader from '@/components/dashboard/DashboardWelcomeHeader';
import DashboardMainContent from '@/components/dashboard/DashboardMainContent';
import PartnerInviteDialog from '@/components/dashboard/PartnerInviteDialog';
import { useDashboardData } from '@/hooks/useDashboardData';
import { GuestStats } from '@/types/guest';

const Dashboard = () => {
  const { user } = useAuth();
  const dashboardData = useDashboardData();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [invitePartnerDialogOpen, setInvitePartnerDialogOpen] = useState(false);
  
  // Guest statistics data
  const guestStats: GuestStats = {
    total: 120,
    confirmed: 45,
    pending: 65,
    declined: 10
  };
  
  // Budget summary data
  const budgetSummary = {
    total: 25000,
    spent: 9500,
    remaining: 15500
  };
  
  // Recent user activities with user names
  const recentActivities = [
    { action: "Added 3 new guests", date: "Today, 2:30 PM", userName: user?.displayName || dashboardData.userName || "You" },
    { action: "Updated venue budget", date: "Yesterday, 4:15 PM", userName: user?.displayName || dashboardData.userName || "You" },
    { action: "Confirmed photographer booking", date: "May 8, 2025", userName: dashboardData.partnerName || "Partner" },
    { action: "Created new guest list", date: "May 5, 2025", userName: user?.displayName || dashboardData.userName || "You" },
  ];

  // Tasks data
  const tasks = [
    { id: '1', title: 'Set your wedding date', completed: true, dueDate: 'Completed' },
    { id: '2', title: 'Create guest list', completed: false, dueDate: '3 months before' },
    { id: '3', title: 'Book venue', completed: false, dueDate: '10 months before' },
    { id: '4', title: 'Book photographer', completed: false, dueDate: '8 months before' },
    { id: '5', title: 'Choose wedding attire', completed: false, dueDate: '6 months before' },
    { id: '6', title: 'Send invitations', completed: false, dueDate: '3 months before' }
  ];

  // User preferences data
  const userPreferences = {
    indoor: true,
    outdoor: false,
    formal: true,
    seasonal: 'Summer',
  };

  // Handle sidebar expansion
  const handleSidebarExpandChange = (expanded: boolean) => {
    setSidebarExpanded(expanded);
  };
  
  const handleInvitePartner = () => {
    setInvitePartnerDialogOpen(true);
  };

  return (
    <DashboardLayout 
      userName={dashboardData.userName}
      partnerName={dashboardData.partnerName}
      sidebarExpanded={sidebarExpanded}
      onSidebarExpandChange={handleSidebarExpandChange}
      isLoading={dashboardData.isLoading}
      onInvitePartner={handleInvitePartner}
    >
      <DashboardWelcomeHeader
        userName={dashboardData.userName}
        partnerName={dashboardData.partnerName}
        weddingDate={dashboardData.weddingDate}
        formattedWeddingDate={dashboardData.formattedWeddingDate}
        weddingHashtag={dashboardData.weddingHashtag}
        user={user}
        onInvitePartner={handleInvitePartner}
      />
      
      <PartnerInviteDialog 
        open={invitePartnerDialogOpen}
        onOpenChange={setInvitePartnerDialogOpen}
      />
      
      <DashboardMainContent
        sidebarExpanded={sidebarExpanded}
        tasks={tasks}
        preferredBudget={dashboardData.preferredBudget}
        userPreferences={userPreferences}
        weddingColors={dashboardData.weddingColors}
        guestStats={guestStats}
        recentActivities={recentActivities}
        budgetSummary={budgetSummary}
      />
    </DashboardLayout>
  );
};

export default Dashboard;

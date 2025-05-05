
import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardWelcomeHeader from '@/components/dashboard/DashboardWelcomeHeader';
import DashboardMainContent from '@/components/dashboard/DashboardMainContent';
import PartnerInviteDialog from '@/components/dashboard/PartnerInviteDialog';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard = () => {
  const { user } = useAuth();
  const dashboardData = useDashboardData();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [invitePartnerDialogOpen, setInvitePartnerDialogOpen] = useState(false);
  
  // Wedding plans data
  const weddingPlans = [
    {
      title: 'Intimate & Cozy',
      description: 'Perfect for a cozy celebration with your closest loved ones',
      price: 'GHS 5k - 10k',
      timeline: '3-6 months',
      guests: '30-50 people',
      features: [
        'Intimate venue setting',
        'Simplified catering menu',
        'DJ instead of live band',
        'Digital invitations',
        'Minimal floral arrangements'
      ]
    },
    {
      title: 'Classic Romance',
      description: 'The traditional wedding experience with all the essentials',
      price: 'GHS 15k - 25k',
      timeline: '9-12 months',
      guests: '80-120 people',
      features: [
        'Traditional venue',
        'Full catering service',
        'Professional photography',
        'Floral arrangements',
        'DJ and dance floor'
      ],
      highlight: true
    },
    {
      title: 'Royal Delight',
      description: 'An extraordinary celebration with premium amenities',
      price: 'GHS 30k+',
      timeline: '12-18 months',
      guests: '150-200+ people',
      features: [
        'Premium venue',
        'Gourmet catering',
        'Live band entertainment',
        'Full wedding planner',
        'Video & photography package',
        'Custom decor & lighting'
      ]
    },
    {
      title: 'Fairytale',
      description: 'A magical experience in a breathtaking location',
      price: 'GHS 20k - 35k',
      timeline: '10-14 months',
      guests: '50-80 people',
      features: [
        'Exotic location venue',
        'Travel arrangements',
        'Welcome reception',
        'Multiple day events',
        'Group activities',
        'Local cultural elements'
      ]
    }
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
        weddingPlans={weddingPlans}
        preferredBudget={dashboardData.preferredBudget}
        userPreferences={userPreferences}
        weddingColors={dashboardData.weddingColors}
      />
    </DashboardLayout>
  );
};

export default Dashboard;

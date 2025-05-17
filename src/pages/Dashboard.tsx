
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardWelcomeHeader from '@/components/dashboard/DashboardWelcomeHeader';
import DashboardMainContent from '@/components/dashboard/DashboardMainContent';
import PartnerInviteDialog from '@/components/dashboard/PartnerInviteDialog';
import { useDashboardData } from '@/hooks/useDashboardData';
import { GuestStats } from '@/types/guest';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const dashboardData = useDashboardData();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [invitePartnerDialogOpen, setInvitePartnerDialogOpen] = useState(false);
  const location = useLocation();
  
  // If user is coming from onboarding or signup with formData, save it to the database
  useEffect(() => {
    const saveOnboardingData = async () => {
      const formData = location.state?.formData;
      const userColors = location.state?.userColors;
      
      if (user && formData) {
        console.log("Saving onboarding data to Supabase:", formData);
        try {
          const { error } = await supabase
            .from('wedding_details')
            .upsert({
              user_id: user.id,
              partner1_name: formData.partner1Name || '',
              partner2_name: formData.partner2Name || '',
              wedding_date: formData.weddingDate || '',
              budget: formData.budget?.toString() || '',
              theme: formData.theme || '',
              guest_count: formData.guestCount?.toString() || '',
              colors: userColors ? JSON.stringify(userColors) : null,
              updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
          
          if (error) {
            console.error('Error saving wedding details:', error);
            toast({
              title: "Warning",
              description: "Failed to save your wedding details.",
              variant: "destructive",
            });
          } else {
            console.log("Wedding details saved successfully");
            // Clear the state now that we've saved it
            window.history.replaceState({}, document.title);
          }
        } catch (error) {
          console.error('Exception saving wedding details:', error);
        }
      }
    };
    
    saveOnboardingData();
  }, [user, location.state]);
  
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
  
  // Recent user activities with partner names
  const recentActivities = [
    { action: "Added 3 new guests", date: "Today, 2:30 PM", userName: dashboardData.userName || "You" },
    { action: "Updated venue budget", date: "Yesterday, 4:15 PM", userName: dashboardData.userName || "You" },
    { action: "Confirmed photographer booking", date: "May 8, 2025", userName: dashboardData.partnerName || "Partner" },
    { action: "Created new guest list", date: "May 5, 2025", userName: dashboardData.userName || "You" },
  ];

  // Tasks data updated with categories
  const tasks = [
    { id: '1', title: 'Set your wedding date', completed: true, dueDate: 'Completed', category: 'planning' },
    { id: '2', title: 'Create guest list', completed: false, dueDate: '3 months before', category: 'planning' },
    { id: '3', title: 'Book venue', completed: false, dueDate: '10 months before', category: 'venue' },
    { id: '4', title: 'Book photographer', completed: false, dueDate: '8 months before', category: 'vendors' },
    { id: '5', title: 'Choose wedding attire', completed: false, dueDate: '6 months before', category: 'attire' },
    { id: '6', title: 'Send invitations', completed: false, dueDate: '3 months before', category: 'planning' }
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
        weddingDate={dashboardData.weddingDate ? dashboardData.weddingDate.toString() : ""}
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

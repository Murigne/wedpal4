import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import HeartAnimation from '@/components/HeartAnimation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WeddingProgressTracker from '@/components/WeddingProgressTracker';
import WeddingTemplates from '@/components/WeddingTemplates';
import QuickActions from '@/components/dashboard/QuickActions';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import RecommendedWeddingPlans from '@/components/dashboard/RecommendedWeddingPlans';
import { calculateDaysUntil } from '@/utils/dateUtils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { UserRound, Mail, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [formattedWeddingDate, setFormattedWeddingDate] = useState('');
  const [weddingColors, setWeddingColors] = useState<string[]>(['#FFC0CB', '#FFAFBD', '#E7F0FD']);
  const [preferredBudget, setPreferredBudget] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [weddingHashtag, setWeddingHashtag] = useState('');
  const [isNewUser] = useState(location.state?.isNewUser || false);
  
  // New states for the invite partner dialog
  const [invitePartnerDialogOpen, setInvitePartnerDialogOpen] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      // Check if we have data passed from onboarding
      if (location.state?.formData) {
        console.log("Using location state data from onboarding:", location.state.formData);
        const formData = location.state.formData;
        setUserName(formData.partner1Name || 'User');
        setPartnerName(formData.partner2Name || 'Partner');
        
        // Handle wedding date
        if (formData.weddingDate) {
          setWeddingDate(typeof formData.weddingDate === 'string' ? formData.weddingDate : new Date(formData.weddingDate).toISOString());
          
          try {
            const date = new Date(formData.weddingDate);
            setFormattedWeddingDate(format(date, 'dd-MMM-yy'));
          } catch (e) {
            console.error("Date formatting error:", e);
            setFormattedWeddingDate('');
          }
        }
        
        // Handle budget
        const formattedBudget = formData.budget 
          ? (typeof formData.budget === 'string' && formData.budget.includes('GHS')) 
             ? formData.budget 
             : `GHS ${formData.budget}`.replace('$', '')
          : 'GHS 15k - 25k';
        setPreferredBudget(formattedBudget);
        
        // Handle colors
        if (location.state.userColors && location.state.userColors.length) {
          setWeddingColors(location.state.userColors);
          applyWeddingColors(location.state.userColors);
          
          // Save to database if user is authenticated
          if (user) {
            saveUserData(formData, location.state.userColors);
          }
        }
        
        // We've handled the data, so set loading to false
        setIsLoading(false);
        return;
      }
      
      // If no location state, we need to fetch from database if user is authenticated
      if (user) {
        console.log("Fetching user data for:", user.id);
        
        try {
          const { data, error } = await supabase
            .from('wedding_details')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
          if (error) {
            if (error.code !== 'PGRST116') {
              console.error("Database error:", error);
              throw error;
            }
            console.log("No wedding details found for user");
          }
          
          if (data) {
            console.log("Wedding details found:", data);
            setUserName(data.partner1_name || 'User');
            setPartnerName(data.partner2_name || 'Partner');
            setWeddingDate(data.wedding_date || '');
            
            setWeddingHashtag(data.hashtag || '');
            
            if (data.wedding_date) {
              try {
                const date = new Date(data.wedding_date);
                setFormattedWeddingDate(format(date, 'dd-MMM-yy'));
              } catch (e) {
                console.error("Date formatting error:", e);
                setFormattedWeddingDate('');
              }
            }
            
            const formattedBudget = data.budget 
              ? data.budget.replace('$', 'GHS ')
              : 'GHS 15k - 25k';
            setPreferredBudget(formattedBudget);
            
            if (data.colors) {
              try {
                const parsedColors = JSON.parse(data.colors);
                if (Array.isArray(parsedColors)) {
                  setWeddingColors(parsedColors);
                  applyWeddingColors(parsedColors);
                }
              } catch (e) {
                console.error('Error parsing colors:', e);
              }
            }
          } else {
            console.log("No wedding details found for user");
          }
        } catch (error) {
          console.error('Error fetching wedding details:', error);
          toast({
            title: "Error",
            description: "Could not load your wedding details",
            variant: "destructive",
          });
        }
      } else {
        // No user and no location state, use defaults
        console.log("Using default values");
        setUserName('User');
        setPartnerName('Partner');
        setWeddingDate('June 15, 2025');
        try {
          const date = new Date('June 15, 2025');
          setFormattedWeddingDate(format(date, 'dd-MMM-yy'));
        } catch (e) {
          console.error("Date formatting error:", e);
          setFormattedWeddingDate('15-Jun-25');
        }
        setPreferredBudget('GHS 15k - 25k');
        applyWeddingColors(weddingColors);
      }
      
      setIsLoading(false);
    };
    
    fetchUserData();
  }, [user, location, navigate]);

  const saveUserData = async (formData: any, colors: string[]) => {
    if (!user) {
      console.log("Cannot save user data - no user logged in");
      return;
    }
    
    try {
      console.log("Saving wedding details for user:", user.id);
      const { error } = await supabase
        .from('wedding_details')
        .upsert({
          user_id: user.id,
          partner1_name: formData.partner1Name,
          partner2_name: formData.partner2Name,
          wedding_date: formData.weddingDate,
          hashtag: formData.hashtag,
          budget: formData.budget?.toString(),
          theme: formData.theme,
          guest_count: formData.guestCount?.toString(),
          honeymoon_destination: formData.honeymoonDestination,
          need_new_home: formData.needNewHome,
          colors: JSON.stringify(colors),
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) {
        console.error('Error saving wedding details:', error);
        throw error;
      }
      
      console.log("Wedding details saved successfully");
    } catch (error) {
      console.error('Error saving wedding details:', error);
    }
  };
  
  const applyWeddingColors = (colors: string[]) => {
    if (colors.length > 0) {
      document.documentElement.style.setProperty('--wedding-color-primary', colors[0]);
      if (colors.length > 1) {
        document.documentElement.style.setProperty('--wedding-color-secondary', colors[1]);
      }
      if (colors.length > 2) {
        document.documentElement.style.setProperty('--wedding-color-tertiary', colors[2]);
      }
      
      const gradientColors = colors.length >= 2 
        ? colors 
        : [...colors, ...(colors.length === 1 ? [adjustColor(colors[0], -30)] : ['#e73c7e', '#23a6d5'])];
      
      const gradientStyle = `linear-gradient(-45deg, ${gradientColors.join(', ')})`;
      document.documentElement.style.setProperty('--dynamic-gradient', gradientStyle);
      
      // Apply gradient to elements with animated-gradient class
      setTimeout(() => {
        const gradientElements = document.querySelectorAll('.animated-gradient');
        gradientElements.forEach(el => {
          (el as HTMLElement).classList.add('dynamic-gradient');
        });
      }, 100);
    }
  };
  
  const adjustColor = (hex: string, amount: number) => {
    return '#' + hex.replace(/^#/, '').replace(/../g, color => {
      const colorNum = parseInt(color, 16);
      const newColorNum = Math.max(Math.min(colorNum + amount, 255), 0);
      return newColorNum.toString(16).padStart(2, '0');
    });
  };

  const tasks = [
    { id: '1', title: 'Set your wedding date', completed: true, dueDate: 'Completed' },
    { id: '2', title: 'Create guest list', completed: false, dueDate: '3 months before' },
    { id: '3', title: 'Book venue', completed: false, dueDate: '10 months before' },
    { id: '4', title: 'Book photographer', completed: false, dueDate: '8 months before' },
    { id: '5', title: 'Choose wedding attire', completed: false, dueDate: '6 months before' },
    { id: '6', title: 'Send invitations', completed: false, dueDate: '3 months before' }
  ];

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

  const userPreferences = {
    indoor: true,
    outdoor: false,
    formal: true,
    seasonal: 'Summer',
  };

  const handleSignUpClick = () => {
    navigate('/signup', { 
      state: { 
        formData: {
          partner1Name: userName,
          partner2Name: partnerName,
          weddingDate: weddingDate,
          budget: preferredBudget.replace('GHS ', ''),
          theme: selectedTheme,
          guestCount: ''
        },
        userColors: weddingColors
      } 
    });
  };
  
  const handleInvitePartner = () => {
    setInvitePartnerDialogOpen(true);
  };
  
  const sendPartnerInvite = async () => {
    if (!partnerEmail || !partnerEmail.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSendingInvite(true);
    
    try {
      // In a real app, this would send an email through a backend service
      // For now, we'll just simulate success
      setTimeout(() => {
        toast({
          title: "Invitation sent!",
          description: `An invitation has been sent to ${partnerEmail}`,
          variant: "default",
        });
        setInvitePartnerDialogOpen(false);
        setPartnerEmail('');
        setIsSendingInvite(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again later.",
        variant: "destructive",
      });
      setIsSendingInvite(false);
    }
  };

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
    <div className="min-h-screen w-full animated-gradient dynamic-gradient relative">
      <HeartAnimation avoidTextAreas={true} count={10} />
      
      <DashboardHeader userName={userName} partnerName={partnerName} />
      
      <main className="w-full px-6 md:px-6 py-8">
        <div className="mb-8 text-white max-w-[1600px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">
            Welcome back, {userName} & {partnerName}!
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white/80 w-full">
            <p>
              Your wedding date: <span className="font-medium">{formattedWeddingDate || weddingDate}</span>
              {weddingDate && <span> · Only {calculateDaysUntil(weddingDate)} days to go!</span>}
            </p>
            
            {/* New action buttons for non-logged in users */}
            {!user && (
              <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                <Button 
                  onClick={handleSignUpClick}
                  className="bg-white text-wedding-pink-dark hover:bg-white/90 flex items-center gap-2"
                >
                  <UserRound size={18} />
                  Sign up to save your progress
                </Button>
                <Button 
                  onClick={handleInvitePartner}
                  variant="outline" 
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 flex items-center gap-2"
                >
                  <Mail size={18} />
                  Invite your partner
                </Button>
              </div>
            )}
          </div>
          
          {weddingHashtag && (
            <p className="sm:ml-4 mt-3">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white font-medium">
                {weddingHashtag}
              </span>
            </p>
          )}
        </div>
        
        {/* Partner invitation dialog */}
        <Dialog open={invitePartnerDialogOpen} onOpenChange={setInvitePartnerDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite your partner</DialogTitle>
              <DialogDescription>
                Send an invitation to your partner to collaborate on wedding planning.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="partner-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Partner's email
                </label>
                <Input
                  id="partner-email"
                  type="email"
                  placeholder="partner@example.com"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setInvitePartnerDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={sendPartnerInvite}
                disabled={isSendingInvite || !partnerEmail}
                className="bg-wedding-pink hover:bg-wedding-pink-dark"
              >
                {isSendingInvite ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send invitation
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          <div className="lg:col-span-3 space-y-6">
            <RecommendedWeddingPlans 
              weddingPlans={weddingPlans}
              preferredBudget={preferredBudget}
            />
            
            <WeddingTemplates
              userBudget={preferredBudget}
              userPreferences={userPreferences}
              userColors={weddingColors}
            />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <WeddingProgressTracker tasks={tasks} className="w-full" />
            
            <QuickActions />
            
            <UpcomingTasks tasks={tasks} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

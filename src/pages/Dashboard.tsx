
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

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [formattedWeddingDate, setFormattedWeddingDate] = useState('');
  const [weddingColors, setWeddingColors] = useState<string[]>(['#FFC0CB', '#FFAFBD', '#E7F0FD']);
  const [preferredBudget, setPreferredBudget] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [weddingHashtag, setWeddingHashtag] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) {
          if (error.code !== 'PGRST116') { // PGRST116 is "row not found" error
            throw error;
          }
          // If no data exists, we'll use the location state or defaults
        }
        
        if (data) {
          setUserName(data.partner1_name || 'User');
          setPartnerName(data.partner2_name || 'Partner');
          setWeddingDate(data.wedding_date || '');
          
          // Handle the hashtag field - it might be null in existing records
          setWeddingHashtag(data.hashtag || '');
          
          if (data.wedding_date) {
            try {
              const date = new Date(data.wedding_date);
              setFormattedWeddingDate(format(date, 'dd-MMM-yy'));
            } catch (e) {
              setFormattedWeddingDate('');
            }
          }
          
          // Update the budget format to use GHS instead of $
          const formattedBudget = data.budget 
            ? data.budget.replace('$', 'GHS ')
            : 'GHS 15k - 25k';
          setPreferredBudget(formattedBudget);
          
          // Set wedding colors if they exist in the database
          // Handle both old and new records that might or might not have colors
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
        } else if (location.state?.formData) {
          // Use data from location state if available
          const formData = location.state.formData;
          setUserName(formData.name || 'User');
          setPartnerName(formData.partnerName || 'Partner');
          setWeddingDate(formData.date ? new Date(formData.date).toLocaleDateString() : '');
          setWeddingHashtag(formData.hashtag || '');
          
          if (formData.date) {
            try {
              const date = new Date(formData.date);
              setFormattedWeddingDate(format(date, 'dd-MMM-yy'));
            } catch (e) {
              setFormattedWeddingDate('');
            }
          }
          
          // Update the budget format to use GHS instead of $
          const formattedBudget = formData.budget 
            ? formData.budget.toString().replace('$', 'GHS ')
            : 'GHS 15k - 25k';
          setPreferredBudget(formattedBudget);
          
          if (location.state.userColors && location.state.userColors.length) {
            setWeddingColors(location.state.userColors);
            applyWeddingColors(location.state.userColors);
            
            // Save the user data to the database
            saveUserData(formData, location.state.userColors);
          }
        } else {
          // Default values
          setUserName('Alex');
          setPartnerName('Jamie');
          setWeddingDate('June 15, 2025');
          try {
            const date = new Date('June 15, 2025');
            setFormattedWeddingDate(format(date, 'dd-MMM-yy'));
          } catch (e) {
            setFormattedWeddingDate('15-Jun-25');
          }
          setPreferredBudget('GHS 15k - 25k');
          applyWeddingColors(weddingColors);
        }
      } catch (error) {
        console.error('Error fetching wedding details:', error);
        toast({
          title: "Error",
          description: "Could not load your wedding details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, location, navigate]);

  const saveUserData = async (formData: any, colors: string[]) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('wedding_details')
        .upsert({
          user_id: user.id,
          partner1_name: formData.name,
          partner2_name: formData.partnerName,
          wedding_date: formData.date,
          hashtag: formData.hashtag,
          budget: formData.budget?.toString(),
          theme: formData.theme,
          guest_count: formData.guests?.toString(),
          honeymoon_destination: formData.honeymoon,
          need_new_home: formData.needNewHome,
          colors: JSON.stringify(colors),
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
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
      document.querySelector('.animated-gradient')?.classList.add('dynamic-gradient');
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
      
      <DashboardHeader userName={userName} />
      
      <main className="w-full px-6 md:px-6 py-8">
        <div className="mb-8 text-white max-w-[1600px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2 ml-6">
            Welcome back, {userName} & {partnerName}!
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center ml-6 text-white/80">
            <p>
              Your wedding date: <span className="font-medium">{formattedWeddingDate || weddingDate}</span>
              {weddingDate && <span> · Only {calculateDaysUntil(weddingDate)} days to go!</span>}
            </p>
            {weddingHashtag && (
              <p className="sm:ml-4 mt-1 sm:mt-0">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white font-medium">
                  {weddingHashtag}
                </span>
              </p>
            )}
          </div>
        </div>
        
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

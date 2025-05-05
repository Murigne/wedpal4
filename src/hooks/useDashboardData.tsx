
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

export interface DashboardData {
  userName: string;
  partnerName: string;
  weddingDate: string;
  formattedWeddingDate: string;
  weddingColors: string[];
  preferredBudget: string;
  selectedTheme: string;
  weddingHashtag: string;
  isLoading: boolean;
}

export const useDashboardData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    userName: '',
    partnerName: '',
    weddingDate: '',
    formattedWeddingDate: '',
    weddingColors: ['#FFC0CB', '#FFAFBD', '#E7F0FD'],
    preferredBudget: '',
    selectedTheme: '',
    weddingHashtag: '',
    isLoading: true,
  });

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

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if we have data passed from onboarding
      if (location.state?.formData) {
        console.log("Using location state data from onboarding:", location.state.formData);
        const formData = location.state.formData;
        const userData = {
          userName: formData.partner1Name || 'User',
          partnerName: formData.partner2Name || 'Partner',
          weddingDate: '',
          formattedWeddingDate: '',
          weddingHashtag: formData.hashtag || '',
          weddingColors: dashboardData.weddingColors,
          preferredBudget: '',
          selectedTheme: formData.theme || '',
          isLoading: false,
        };
        
        // Handle wedding date
        if (formData.weddingDate) {
          userData.weddingDate = typeof formData.weddingDate === 'string' 
            ? formData.weddingDate 
            : new Date(formData.weddingDate).toISOString();
          
          try {
            const date = new Date(formData.weddingDate);
            userData.formattedWeddingDate = format(date, 'dd-MMM-yy');
          } catch (e) {
            console.error("Date formatting error:", e);
            userData.formattedWeddingDate = '';
          }
        }
        
        // Handle budget
        const formattedBudget = formData.budget 
          ? (typeof formData.budget === 'string' && formData.budget.includes('GHS')) 
             ? formData.budget 
             : `GHS ${formData.budget}`.replace('$', '')
          : 'GHS 15k - 25k';
        userData.preferredBudget = formattedBudget;
        
        // Handle colors
        if (location.state.userColors && location.state.userColors.length) {
          userData.weddingColors = location.state.userColors;
          applyWeddingColors(location.state.userColors);
          
          // Save to database if user is authenticated
          if (user) {
            saveUserData(formData, location.state.userColors);
          }
        }
        
        setDashboardData(userData);
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
            const userData = {
              userName: data.partner1_name || 'User',
              partnerName: data.partner2_name || 'Partner',
              weddingDate: data.wedding_date || '',
              formattedWeddingDate: '',
              weddingHashtag: data.hashtag || '',
              weddingColors: dashboardData.weddingColors,
              preferredBudget: '',
              selectedTheme: data.theme || '',
              isLoading: false,
            };
            
            if (data.wedding_date) {
              try {
                const date = new Date(data.wedding_date);
                userData.formattedWeddingDate = format(date, 'dd-MMM-yy');
              } catch (e) {
                console.error("Date formatting error:", e);
              }
            }
            
            const formattedBudget = data.budget 
              ? data.budget.replace('$', 'GHS ')
              : 'GHS 15k - 25k';
            userData.preferredBudget = formattedBudget;
            
            if (data.colors) {
              try {
                const parsedColors = JSON.parse(data.colors);
                if (Array.isArray(parsedColors)) {
                  userData.weddingColors = parsedColors;
                  applyWeddingColors(parsedColors);
                }
              } catch (e) {
                console.error('Error parsing colors:', e);
              }
            }
            
            setDashboardData(userData);
          } else {
            console.log("No wedding details found for user");
            setDefaultUserData();
          }
        } catch (error) {
          console.error('Error fetching wedding details:', error);
          toast({
            title: "Error",
            description: "Could not load your wedding details",
            variant: "destructive",
          });
          setDefaultUserData();
        }
      } else {
        // No user and no location state, use defaults
        setDefaultUserData();
      }
    };
    
    const setDefaultUserData = () => {
      console.log("Using default values");
      const userData = {
        userName: 'User',
        partnerName: 'Partner',
        weddingDate: 'June 15, 2025',
        formattedWeddingDate: '15-Jun-25',
        weddingHashtag: '',
        weddingColors: dashboardData.weddingColors,
        preferredBudget: 'GHS 15k - 25k',
        selectedTheme: '',
        isLoading: false,
      };
      
      try {
        const date = new Date('June 15, 2025');
        userData.formattedWeddingDate = format(date, 'dd-MMM-yy');
      } catch (e) {
        console.error("Date formatting error:", e);
      }
      
      setDashboardData(userData);
      applyWeddingColors(userData.weddingColors);
    };
    
    fetchUserData();
  }, [user, location, navigate]);

  return dashboardData;
};

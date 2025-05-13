
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/utils/dateUtils';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardData = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const [partnerName, setPartnerName] = useState<string | undefined>('');
  const [weddingDate, setWeddingDate] = useState<Date | null>(null);
  const [formattedWeddingDate, setFormattedWeddingDate] = useState<string | null>(null);
  const [preferredBudget, setPreferredBudget] = useState<string>('$15,000 - $25,000');
  const [weddingHashtag, setWeddingHashtag] = useState<string | null>('#ForeverTogether');
  const [weddingColors, setWeddingColors] = useState<string[]>(['#FDE2E4', '#FAD2E1', '#E2CFC4', '#F7F7F7']);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          // Fetch data from Supabase for authenticated users
          console.log("Fetching wedding details from Supabase for user:", user.id);
          const { data, error } = await supabase
            .from('wedding_details')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error) {
            if (error.code !== 'PGRST116') { // Not found error
              throw error;
            }
            console.log("No wedding details found for user in database");
          }

          if (data) {
            console.log("Wedding details found:", data);
            setUserName(data.partner1_name || 'User');
            setPartnerName(data.partner2_name || '');
            
            if (data.wedding_date) {
              const parsedDate = new Date(data.wedding_date);
              setWeddingDate(parsedDate);
              setFormattedWeddingDate(formatDate(parsedDate));
            }
            
            setPreferredBudget(data.budget || '$15,000 - $25,000');
            setWeddingHashtag(data.hashtag || '#ForeverTogether');
            
            if (data.colors) {
              try {
                setWeddingColors(JSON.parse(data.colors));
              } catch (e) {
                console.error("Error parsing wedding colors:", e);
              }
            }
          } else {
            // Fallback to localStorage if no data in Supabase
            fetchFromLocalStorage();
          }
        } else {
          // Use localStorage for non-authenticated users
          fetchFromLocalStorage();
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
        // Fallback to localStorage on error
        fetchFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFromLocalStorage = () => {
      console.log("Using localStorage for dashboard data");
      setUserName(localStorage.getItem('userName') || 'Ashley');
      setPartnerName(localStorage.getItem('partnerName') || 'Jordan');
      
      const futureDateStr = localStorage.getItem('weddingDate') || '2025-08-15';
      const parsedDate = new Date(futureDateStr);
      setWeddingDate(parsedDate);
      setFormattedWeddingDate(formatDate(parsedDate));
      
      setPreferredBudget(localStorage.getItem('preferredBudget') || '$15,000 - $25,000');
      setWeddingHashtag(localStorage.getItem('weddingHashtag') || '#ForeverTogether');
      
      const colors = localStorage.getItem('weddingColors');
      if (colors) {
        setWeddingColors(JSON.parse(colors));
      }
    };

    fetchDashboardData();
  }, [user]);

  const updateUserAndPartnerNames = async (newUserName: string, newPartnerName: string) => {
    try {
      if (user) {
        // Update in Supabase for authenticated users
        console.log("Updating names in Supabase:", newUserName, newPartnerName);
        const { error } = await supabase
          .from('wedding_details')
          .upsert({
            user_id: user.id,
            partner1_name: newUserName,
            partner2_name: newPartnerName,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });

        if (error) throw error;
      } else {
        // Update in localStorage for non-authenticated users
        localStorage.setItem('userName', newUserName);
        localStorage.setItem('partnerName', newPartnerName);
      }
      
      // Update state to reflect changes immediately
      setUserName(newUserName);
      setPartnerName(newPartnerName);
      
      return true;
    } catch (error) {
      console.error('Error updating names:', error);
      throw error;
    }
  };

  return {
    isLoading,
    userName,
    partnerName,
    weddingDate,
    formattedWeddingDate,
    preferredBudget,
    weddingHashtag,
    weddingColors,
    updateUserAndPartnerNames
  };
};

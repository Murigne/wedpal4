
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { FormData } from '../useOnboardingState';

export const useOnboardingData = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFetchingData, setIsFetchingData] = useState(true);
  
  // Fetch existing wedding details for authenticated users
  useEffect(() => {
    const fetchWeddingDetails = async () => {
      if (!user) {
        setIsFetchingData(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            setIsFetchingData(false);
            return;
          }
          throw error;
        }

        if (data) {
          const formData = {
            partner1Name: data.partner1_name || '',
            partner2Name: data.partner2_name || '',
            weddingDate: data.wedding_date || '',
            budget: data.budget || '',
            theme: data.theme || '',
            guestCount: data.guest_count || '',
          };
          
          navigate('/dashboard', { 
            state: { formData } 
          });
        }
      } catch (error: any) {
        console.error('Error fetching wedding details:', error);
        toast({
          title: "Error",
          description: "Failed to load your saved wedding details",
          variant: "destructive",
        });
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchWeddingDetails();
  }, [user, navigate]);

  return { isFetchingData, user };
};

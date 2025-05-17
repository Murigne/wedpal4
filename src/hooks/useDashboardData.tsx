
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/utils/dateUtils';

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
        // In a real app, these values would come from an API/database
        // Here we'll just set some placeholder data
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
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const updateUserAndPartnerNames = async (newUserName: string, newPartnerName: string) => {
    try {
      // In a real app, this would be an API call to update the user's data
      localStorage.setItem('userName', newUserName);
      localStorage.setItem('partnerName', newPartnerName);
      
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

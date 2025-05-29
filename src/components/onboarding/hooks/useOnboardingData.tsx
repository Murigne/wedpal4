
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';

export const useOnboardingData = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFetchingData, setIsFetchingData] = useState(false);
  
  // Mock implementation without Supabase
  useEffect(() => {
    setIsFetchingData(false);
  }, [user, navigate]);

  return { isFetchingData, user };
};

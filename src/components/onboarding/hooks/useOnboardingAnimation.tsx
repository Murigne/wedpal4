
import { useState } from 'react';
import { ChatFormData } from '../useChatOnboardingState';

export const useOnboardingAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const getInitials = (formData: ChatFormData) => {
    const p1Initial = formData.partner1Name ? formData.partner1Name.charAt(0).toUpperCase() : '';
    const p2Initial = formData.partner2Name ? formData.partner2Name.charAt(0).toUpperCase() : '';
    return `${p1Initial} & ${p2Initial}`;
  };

  const getWelcomeMessage = (formData: ChatFormData) => {
    return `${formData.partner1Name}, ${formData.partner2Name} – we are excited about this beautiful journey you are about to embark on. As you answer the next series of questions, we hope we can bring your dream wedding to life.`;
  };

  return {
    showAnimation,
    setShowAnimation,
    getInitials,
    getWelcomeMessage,
  };
};

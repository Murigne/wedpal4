
import { useState, useEffect } from 'react';
import { Heart, Calendar, Coins, Palette, Users } from 'lucide-react';

export interface FormData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  budget: string;
  theme: string;
  guestCount: string;
}

interface Question {
  id: string;
  message: string;
  field: string | string[];
  icon: JSX.Element;
  placeholder: string;
}

export const useOnboardingState = () => {
  const QUESTIONS: Question[] = [
    {
      id: 'welcome',
      message: "Hi there! 💕 I'm your AI wedding planner. Let's start planning your dream wedding together! What are your names?",
      field: ['partner1Name', 'partner2Name'],
      icon: <Heart className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "Partner 1's name & Partner 2's name"
    },
    {
      id: 'date',
      message: "That's wonderful! When are you thinking of having your special day?",
      field: 'weddingDate',
      icon: <Calendar className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "MM/DD/YYYY"
    },
    {
      id: 'budget',
      message: "Great! Now, what budget range are you considering for your wedding?",
      field: 'budget',
      icon: <Coins className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "e.g., $10,000 - $20,000"
    },
    {
      id: 'theme',
      message: "What theme or style are you envisioning for your wedding? (Colors, indoor/outdoor, etc.)",
      field: 'theme',
      icon: <Palette className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "e.g., Rustic outdoor with sage green & blush"
    },
    {
      id: 'guests',
      message: "How many guests are you planning to invite?",
      field: 'guestCount',
      icon: <Users className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "e.g., 50, 100, 150+"
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    partner1Name: '',
    partner2Name: '',
    weddingDate: '',
    budget: '',
    theme: '',
    guestCount: '',
  });
  const [messages, setMessages] = useState<Array<{ content: string; sender: 'ai' | 'user' }>>([]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ content: QUESTIONS[0].message, sender: 'ai' }]);
    }
  }, [messages.length, QUESTIONS]);

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    messages,
    setMessages,
    QUESTIONS
  };
};

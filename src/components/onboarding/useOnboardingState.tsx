
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

export interface ValidationErrors {
  partner1Name?: string;
  partner2Name?: string;
  weddingDate?: string;
  budget?: string;
  theme?: string;
  guestCount?: string;
}

interface Question {
  id: string;
  message: string;
  field: string | string[];
  icon: JSX.Element;
  placeholder: string;
  validation?: (value: string) => string | undefined;
}

export const useOnboardingState = () => {
  const QUESTIONS: Question[] = [
    {
      id: 'welcome',
      message: "Hi there! 💕 I'm your AI wedding planner. Let's start planning your dream wedding together! What are your names?",
      field: ['partner1Name', 'partner2Name'],
      icon: <Heart className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "Partner 1's name & Partner 2's name",
      validation: (value: string) => value.length < 2 ? "Name must be at least 2 characters" : undefined
    },
    {
      id: 'date',
      message: "That's wonderful! When are you thinking of having your special day?",
      field: 'weddingDate',
      icon: <Calendar className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "MM/DD/YYYY",
      validation: (value: string) => {
        if (!value) return "Date is required";
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(value)) return "Please use MM/DD/YYYY format";
        
        const date = new Date(value);
        const today = new Date();
        if (isNaN(date.getTime())) return "Please enter a valid date";
        if (date < today) return "Wedding date cannot be in the past";
        
        return undefined;
      }
    },
    {
      id: 'budget',
      message: "Great! Now, what budget range are you considering for your wedding?",
      field: 'budget',
      icon: <Coins className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "e.g., $10,000 - $20,000",
      validation: (value: string) => {
        if (!value) return "Budget is required";
        return undefined;
      }
    },
    {
      id: 'theme',
      message: "What theme or style are you envisioning for your wedding? (Colors, indoor/outdoor, etc.)",
      field: 'theme',
      icon: <Palette className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "e.g., Rustic outdoor with sage green & blush",
      validation: (value: string) => {
        if (!value) return "Theme is required";
        if (value.length < 3) return "Please provide more details about your theme";
        return undefined;
      }
    },
    {
      id: 'guests',
      message: "How many guests are you planning to invite?",
      field: 'guestCount',
      icon: <Users className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "e.g., 50, 100, 150+",
      validation: (value: string) => {
        if (!value) return "Guest count is required";
        return undefined;
      }
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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
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
    validationErrors,
    setValidationErrors,
    messages,
    setMessages,
    QUESTIONS
  };
};

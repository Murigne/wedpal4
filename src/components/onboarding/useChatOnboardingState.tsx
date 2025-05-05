
import { useState, useRef } from 'react';
import { Calendar, Coins, Palette, Users, Mail, Lock, User } from 'lucide-react';

export interface ChatFormData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  budget: string;
  theme: string;
  guestCount: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  partner1Name?: string;
  partner2Name?: string;
  weddingDate?: string;
  budget?: string;
  theme?: string;
  guestCount?: string;
  email?: string;
  password?: string;
}

export interface QuestionType {
  id: string;
  message: string | ((formData: ChatFormData) => string);
  field: keyof ChatFormData | Array<keyof ChatFormData>;
  icon: JSX.Element;
  placeholder: string | string[];
  validation?: (value: string) => string | undefined;
}

export const useChatOnboardingState = () => {
  const QUESTIONS: QuestionType[] = [
    {
      id: 'welcome',
      message: "Hi there! 💕 I'm your AI wedding planner. Let's start planning your dream wedding together! What are your names?",
      field: ['partner1Name', 'partner2Name'],
      icon: <User className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: ["Your name", "Partner's name"],
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
    },
    {
      id: 'email',
      message: "Finally, what's your email address?",
      field: 'email',
      icon: <Mail className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "yourname@example.com",
      validation: (value: string) => {
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return undefined;
      }
    },
    {
      id: 'password',
      message: (formData) => `Create a password as strong as your love for ${formData.partner2Name}`,
      field: 'password',
      icon: <Lock className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "Your strong password",
      validation: (value: string) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return undefined;
      }
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ChatFormData>({
    partner1Name: '',
    partner2Name: '',
    weddingDate: '',
    budget: '',
    theme: '',
    guestCount: '',
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [messages, setMessages] = useState<Array<{ content: string; sender: 'ai' | 'user' }>>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return {
    QUESTIONS,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    validationErrors,
    setValidationErrors,
    messages,
    setMessages,
    showAnimation,
    setShowAnimation,
    messagesEndRef,
    isTyping,
    setIsTyping,
    isCreatingAccount,
    setIsCreatingAccount,
    error,
    setError
  };
};

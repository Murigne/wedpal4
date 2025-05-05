
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

export interface QuestionType {
  id: string;
  message: string | ((formData: ChatFormData) => string);
  field: keyof ChatFormData | Array<keyof ChatFormData>;
  icon: JSX.Element;
  placeholder: string | string[];
}

export const useChatOnboardingState = () => {
  const QUESTIONS: QuestionType[] = [
    {
      id: 'welcome',
      message: "Hi there! 💕 I'm your AI wedding planner. Let's start planning your dream wedding together! What are your names?",
      field: ['partner1Name', 'partner2Name'],
      icon: <User className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: ["Your name", "Partner's name"]
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
    },
    {
      id: 'email',
      message: "Finally, what's your email address?",
      field: 'email',
      icon: <Mail className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "yourname@example.com"
    },
    {
      id: 'password',
      message: (formData) => `Create a password as strong as your love for ${formData.partner2Name}`,
      field: 'password',
      icon: <Lock className="w-5 h-5 text-wedding-pink-dark" />,
      placeholder: "Your strong password"
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

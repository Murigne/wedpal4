import { useState, useRef } from 'react';
import { Calendar, User, Palette } from 'lucide-react';

export interface QuestionType {
  message: string | ((formData: any) => string);
  field: string | string[];
  placeholder: string | string[];
  icon: JSX.Element;
  validation?: (value: any) => string | undefined;
}

export interface ChatFormData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  weddingColors: string;
}

export interface ValidationErrors {
  partner1Name?: string;
  partner2Name?: string;
  weddingDate?: string;
  weddingColors?: string;
}

export const useChatOnboardingState = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ChatFormData>({
    partner1Name: "",
    partner2Name: "",
    weddingDate: "",
    weddingColors: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [messages, setMessages] = useState<{ content: string, sender: 'user' | 'ai' }[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Keep only 4 questions in the onboarding flow
  const QUESTIONS: QuestionType[] = [
    {
      message: "Hi there! I'm your wedding planning assistant. What are your names?",
      field: ["partner1Name", "partner2Name"],
      placeholder: ["Your name", "Partner's name"],
      icon: <User className="h-4 w-4 text-pink-500" />,
      validation: (value) => {
        if (!value || value.trim().length < 2) {
          return "Name should be at least 2 characters";
        }
        return undefined;
      }
    },
    {
      message: (formData) => `Wonderful! ${formData.partner1Name} and ${formData.partner2Name}, when is your special day?`,
      field: "weddingDate",
      placeholder: "DD/MM/YYYY",
      icon: <Calendar className="h-4 w-4 text-pink-500" />,
      validation: (value) => {
        if (!value) {
          return "Wedding date is required";
        }
        
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!dateRegex.test(value)) {
          return "Please use format DD/MM/YYYY";
        }
        
        const [, day, month, year] = dateRegex.exec(value) || [];
        const dateObj = new Date(`${year}-${month}-${day}`);
        
        if (isNaN(dateObj.getTime())) {
          return "Invalid date";
        }
        
        const today = new Date();
        if (dateObj < today) {
          return "Wedding date should be in the future";
        }
        
        return undefined;
      }
    },
    {
      message: (formData) => `Great! Your wedding is set for ${formData.weddingDate}. What colors would you like for your wedding theme?`,
      field: "weddingColors",
      placeholder: "E.g., Pink, Gold, White",
      icon: <Palette className="h-4 w-4 text-pink-500" />,
      validation: (value) => {
        if (!value || value.trim() === '') {
          return "Please enter at least one color";
        }
        return undefined;
      }
    }
  ];
  
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

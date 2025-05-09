
import { useState } from 'react';
import { Calendar, User, Mail, Lock } from 'lucide-react';

export interface QuestionType {
  message: string | ((formData: any) => string);
  field: string | string[];
  placeholder: string | string[];
  icon: JSX.Element;
  validation?: (value: any) => string | undefined;
}

export interface FormData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  weddingColors: string[];
  email: string;
  password: string;
}

export interface ValidationErrors {
  partner1Name?: string;
  partner2Name?: string;
  weddingDate?: string;
  weddingColors?: string;
  email?: string;
  password?: string;
}

export const useOnboardingState = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [formData, setFormData] = useState<FormData>({
    partner1Name: '',
    partner2Name: '',
    weddingDate: '',
    weddingColors: [],
    email: '',
    password: ''
  });
  
  const [messages, setMessages] = useState<{content: string, sender: 'user' | 'ai'}[]>([]);
  
  const QUESTIONS: QuestionType[] = [
    {
      message: "Hi there! What are your names?",
      field: ["partner1Name", "partner2Name"],
      placeholder: ["Your name", "Your partner's name"],
      icon: <User className="h-4 w-4 text-wedding-pink" />,
      validation: (value) => {
        if (!value || value.trim().length < 2) {
          return "Name should be at least 2 characters";
        }
        return undefined;
      }
    },
    {
      message: (formData) => `Wonderful! ${formData.partner1Name} and ${formData.partner2Name}, when is your wedding date?`,
      field: "weddingDate",
      placeholder: "DD/MM/YYYY",
      icon: <Calendar className="h-4 w-4 text-wedding-pink" />,
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
      icon: <User className="h-4 w-4 text-wedding-pink" />,
      validation: (value) => {
        if (!value || value.length === 0) {
          return "Please select at least one color";
        }
        return undefined;
      }
    }
  ];
  
  return {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    messages,
    setMessages,
    QUESTIONS
  };
};

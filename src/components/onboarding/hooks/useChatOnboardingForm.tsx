
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { ChatFormData, ValidationErrors, QuestionType } from '../useChatOnboardingState';

export const useChatOnboardingForm = (
  formData: ChatFormData,
  setFormData: React.Dispatch<React.SetStateAction<ChatFormData>>,
  QUESTIONS: QuestionType[],
  currentStep: number,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  messages: Array<{ content: string, sender: 'user' | 'ai' }>,
  setMessages: React.Dispatch<React.SetStateAction<{ content: string, sender: 'user' | 'ai' }[]>>,
  setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>,
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const createAccount = async () => {
    try {
      setIsCreatingAccount(true);
      
      console.log("Navigating to dashboard with formData:", formData);
      
      // Navigate directly to dashboard
      navigate('/dashboard', { 
        state: { 
          formData,
          userColors: [],
          isNewUser: true // Flag to indicate this is a new user coming from onboarding
        } 
      });
    } catch (err: any) {
      setError(err.message);
      setMessages(prev => [...prev, { content: `Error creating account: ${err.message}. Please try again.`, sender: 'ai' }]);
      setIsCreatingAccount(false);
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentQuestion = QUESTIONS[currentStep];
    const errors: Record<string, string> = {};
    let isValid = true;

    if (Array.isArray(currentQuestion.field)) {
      // Handle first step with two fields
      const field1 = currentQuestion.field[0];
      const field2 = currentQuestion.field[1];
      
      if (currentQuestion.validation) {
        const error1 = currentQuestion.validation(formData[field1]);
        const error2 = currentQuestion.validation(formData[field2]);
        
        if (error1) {
          errors[field1] = error1;
          isValid = false;
        }
        
        if (error2) {
          errors[field2] = error2;
          isValid = false;
        }
      }
    } else {
      // Handle steps with a single field
      const field = Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field;
      
      if (currentQuestion.validation) {
        const error = currentQuestion.validation(formData[field]);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      }
    }
    
    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the current step
    if (!validateCurrentStep()) return;
    
    const question = QUESTIONS[currentStep];
    let userResponse = '';
    
    if (Array.isArray(question.field)) {
      userResponse = `${formData[question.field[0]]} & ${formData[question.field[1]]}`;
    } else {
      userResponse = formData[question.field];
    }
    
    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);
    
    if (currentStep === 0) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        moveToNextQuestion();
      }, 8000);
    } else if (currentStep === QUESTIONS.length - 1) {
      // Final question (wedding colors) answered - go straight to dashboard
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          content: "Thanks for all your information! Creating your personalized dashboard...", 
          sender: 'ai' 
        }]);
        
        toast({
          title: "Welcome to your wedding dashboard!",
          description: "We've created your personalized wedding experience.",
          duration: 3000,
        });
        
        createAccount();
      }, 500);
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        
        const nextQuestion = QUESTIONS[currentStep + 1];
        const messageContent = typeof nextQuestion.message === 'function' 
          ? nextQuestion.message(formData) 
          : nextQuestion.message;
          
        setMessages(prev => [...prev, { content: messageContent, sender: 'ai' }]);
        setIsTyping(false);
      }, 500);
    }
  };

  return {
    validationErrors,
    handleInputChange,
    handleLoginClick,
    handleSubmit,
    error
  };
};

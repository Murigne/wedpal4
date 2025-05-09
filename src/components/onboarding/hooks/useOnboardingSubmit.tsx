
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationErrors } from '../useOnboardingState';
import { toast } from '@/hooks/use-toast';

export const useOnboardingSubmit = (
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  setMessages: React.Dispatch<React.SetStateAction<{content: string, sender: 'user' | 'ai'}[]>>,
  currentStep: number,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  QUESTIONS: any[]
) => {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateCurrentStep = (): boolean => {
    const currentQuestion = QUESTIONS[currentStep];
    const errors: ValidationErrors = {};
    let isValid = true;

    if (Array.isArray(currentQuestion.field)) {
      // Step with multiple fields
      currentQuestion.field.forEach((field: string) => {
        if (currentQuestion.validation && formData[field]) {
          const error = currentQuestion.validation(formData[field]);
          if (error) {
            errors[field as keyof ValidationErrors] = error;
            isValid = false;
          }
        }
      });
    } else {
      // Step with single field
      const field = currentQuestion.field;
      if (currentQuestion.validation) {
        const error = currentQuestion.validation(formData[field]);
        if (error) {
          errors[field as keyof ValidationErrors] = error;
          isValid = false;
        }
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    const userResponse = 
      Array.isArray(QUESTIONS[currentStep].field) 
        ? `${formData[QUESTIONS[currentStep].field[0]]} & ${formData[QUESTIONS[currentStep].field[1]]}` 
        : formData[QUESTIONS[currentStep].field];

    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);

    // Special handling for the wedding colors step (index 2)
    if (currentStep === 2) {
      setMessages(prev => [...prev, { 
        content: "Great! I've collected everything I need to create your personalized dashboard. Taking you there now!", 
        sender: 'ai' 
      }]);
      
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            formData: formData,
            isNewUser: true,
            userColors: formData.weddingColors
          } 
        });
      }, 1500);
      return;
    }

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        
        // Add AI's next question to chat
        const nextQuestion = QUESTIONS[currentStep + 1];
        const messageContent = typeof nextQuestion.message === 'function' 
          ? nextQuestion.message(formData) 
          : nextQuestion.message;
          
        setMessages(prev => [...prev, { content: messageContent, sender: 'ai' }]);
      }, 500);
    } else {
      setIsSubmitting(true);
      
      try {
        // Submit the form data and navigate to dashboard
        navigate('/dashboard', { 
          state: { 
            formData: formData,
            isNewUser: true,
            userColors: formData.weddingColors
          } 
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Something went wrong",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }
  };

  return {
    validationErrors,
    setValidationErrors,
    handleFormSubmit,
    isSubmitting
  };
};

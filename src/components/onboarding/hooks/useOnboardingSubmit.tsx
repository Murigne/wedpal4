
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { FormData } from '../useOnboardingState';

export const useOnboardingSubmit = (
  formData: FormData, 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setMessages: React.Dispatch<React.SetStateAction<Array<{ content: string; sender: 'ai' | 'user' }>>>,
  currentStep: number,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  QUESTIONS: any[]
) => {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Save data to Supabase
  const saveDataToSupabase = async (userId: string | undefined) => {
    try {
      if (userId) {
        const { error } = await supabase
          .from('wedding_details')
          .upsert({
            user_id: userId,
            partner1_name: formData.partner1Name,
            partner2_name: formData.partner2Name,
            wedding_date: formData.weddingDate,
            budget: formData.budget,
            theme: formData.theme,
            guest_count: formData.guestCount,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Your wedding details have been saved!",
          variant: "default",
        });
      }
      
      navigate('/dashboard', { 
        state: { 
          formData,
          userColors: [],
          isNewUser: true
        } 
      });
    } catch (error: any) {
      console.error('Error saving wedding details:', error);
      toast({
        title: "Error", 
        description: "Failed to save your wedding details",
        variant: "destructive",
      });
    }
  };

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const currentQuestion = QUESTIONS[currentStep];
    const errors: Record<string, string> = {};
    let isValid = true;

    if (Array.isArray(currentQuestion.field)) {
      // Handle first step with two fields
      const field1 = currentQuestion.field[0] as keyof typeof formData;
      const field2 = currentQuestion.field[1] as keyof typeof formData;
      
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
      const field = currentQuestion.field as keyof typeof formData;
      
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

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the current step
    if (!validateCurrentStep()) return;
    
    const question = QUESTIONS[currentStep];
    let userResponse = '';
    
    if (Array.isArray(question.field)) {
      userResponse = `${formData[question.field[0] as keyof typeof formData]} & ${formData[question.field[1] as keyof typeof formData]}`;
    } else {
      userResponse = formData[question.field as keyof typeof formData];
    }
    
    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);
    
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setMessages(prev => [...prev, { content: QUESTIONS[currentStep + 1].message, sender: 'ai' }]);
      }, 500);
    } else {
      // Final question answered - go to dashboard directly
      // Add a final message before navigating
      setMessages(prev => [...prev, { 
        content: "Thanks for all your information! Creating your personalized dashboard...", 
        sender: 'ai' 
      }]);
      
      // Use a setTimeout with an async function inside to handle asynchronous operations
      setTimeout(() => {
        const navigateToDashboard = async () => {
          // Fix: Get current user properly with async/await
          const { data } = await supabase.auth.getUser();
          const user = data?.user;
          await saveDataToSupabase(user?.id);
        };
        navigateToDashboard();
      }, 1000);
    }
  };

  return {
    validationErrors,
    setValidationErrors,
    handleFormSubmit
  };
};


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingState, QuestionType } from './useOnboardingState';
import OnboardingChat from './OnboardingChat';
import OnboardingForm from './OnboardingForm';
import OnboardingHeader from './OnboardingHeader';
import OnboardingLoading from './OnboardingLoading';
import FloatingHearts from '../FloatingHearts';
import { useOnboardingData } from './hooks/useOnboardingData';
import { toast } from "@/components/ui/use-toast";

const OnboardingContainer: React.FC = () => {
  const { isFetchingData, user } = useOnboardingData();
  const navigate = useNavigate();
  
  const { 
    formData, 
    setFormData, 
    currentStep, 
    setCurrentStep, 
    messages, 
    setMessages, 
    QUESTIONS
  } = useOnboardingState();

  // Handle form validation and submission
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate current step
    let valid = true;
    const errors: Record<string, string> = {};
    
    const currentQuestion = QUESTIONS[currentStep];
    
    if (Array.isArray(currentQuestion.field)) {
      // Handle first step with two fields
      const field1 = currentQuestion.field[0];
      const field2 = currentQuestion.field[1];
      
      if (currentQuestion.validation) {
        const error1 = currentQuestion.validation(formData[field1 as keyof typeof formData]);
        const error2 = currentQuestion.validation(formData[field2 as keyof typeof formData]);
        
        if (error1) {
          errors[field1] = error1;
          valid = false;
        }
        
        if (error2) {
          errors[field2] = error2;
          valid = false;
        }
      }
    } else {
      // Handle steps with a single field
      const field = currentQuestion.field as string;
      
      if (currentQuestion.validation) {
        const error = currentQuestion.validation(formData[field as keyof typeof formData]);
        if (error) {
          errors[field] = error;
          valid = false;
        }
      }
    }
    
    setValidationErrors(errors);
    
    if (!valid) {
      return;
    }
    
    // Add user response to chat
    let userResponse = '';
    
    if (Array.isArray(currentQuestion.field)) {
      userResponse = `${formData[currentQuestion.field[0] as keyof typeof formData]} & ${formData[currentQuestion.field[1] as keyof typeof formData]}`;
    } else {
      userResponse = String(formData[currentQuestion.field as keyof typeof formData]);
    }
    
    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);
    
    // If this is the wedding colors step (the last step), navigate to dashboard
    if (currentStep === QUESTIONS.length - 1) {
      // Save data to localStorage for non-authenticated users
      localStorage.setItem('userName', formData.partner1Name || '');
      localStorage.setItem('partnerName', formData.partner2Name || '');
      localStorage.setItem('weddingDate', formData.weddingDate || '');
      localStorage.setItem('preferredBudget', formData.budget || '');
      
      if (formData.weddingColors) {
        localStorage.setItem('weddingColors', JSON.stringify(formData.weddingColors));
      }
      
      // Show success message
      toast({
        title: "Welcome to your wedding dashboard!",
        description: "We've created your personalized wedding experience.",
        duration: 3000,
      });
      
      // Navigate to dashboard with the collected data
      navigate('/dashboard', { 
        state: { 
          formData,
          userColors: formData.weddingColors,
          isNewUser: true
        } 
      });
      return;
    }
    
    // Otherwise move to next step
    setCurrentStep(prev => prev + 1);
    
    // Add next question to chat
    const nextQuestion = QUESTIONS[currentStep + 1];
    const nextQuestionContent = typeof nextQuestion.message === 'function' 
      ? nextQuestion.message(formData) 
      : nextQuestion.message;
      
    setMessages(prev => [...prev, { content: nextQuestionContent, sender: 'ai' }]);
  };

  useEffect(() => {
    if (messages.length === 0) {
      const firstMessage = typeof QUESTIONS[0].message === 'function' 
        ? QUESTIONS[0].message({}) 
        : QUESTIONS[0].message;
        
      setMessages([{ content: firstMessage, sender: 'ai' }]);
    }
  }, [messages.length, QUESTIONS, setMessages]);

  if (isFetchingData) {
    return <OnboardingLoading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden animated-gradient">
      <FloatingHearts count={15} />
      
      <div className="wedding-card w-full max-w-md md:max-w-lg backdrop-blur-sm mb-8">
        <OnboardingHeader user={user} />
        
        <OnboardingChat messages={messages} />
        
        <OnboardingForm 
          currentStep={currentStep}
          formData={formData}
          validationErrors={validationErrors as Record<string, string>}
          setFormData={setFormData}
          handleSubmit={handleFormSubmit}
          QUESTIONS={QUESTIONS}
        />
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Your love story is uniquely yours. <br />
        We're here to help you plan every magical moment.
      </p>
    </div>
  );
};

export default OnboardingContainer;

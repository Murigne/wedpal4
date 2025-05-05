
import React, { useEffect } from 'react';
import { useOnboardingState } from './useOnboardingState';
import OnboardingChat from './OnboardingChat';
import OnboardingForm from './OnboardingForm';
import OnboardingHeader from './OnboardingHeader';
import OnboardingLoading from './OnboardingLoading';
import FloatingHearts from '../FloatingHearts';
import { useOnboardingData } from './hooks/useOnboardingData';
import { useOnboardingSubmit } from './hooks/useOnboardingSubmit';

const OnboardingContainer: React.FC = () => {
  const { isFetchingData, user } = useOnboardingData();
  
  const { 
    formData, 
    setFormData, 
    currentStep, 
    setCurrentStep, 
    messages, 
    setMessages, 
    QUESTIONS
  } = useOnboardingState();

  const {
    validationErrors,
    setValidationErrors,
    handleFormSubmit
  } = useOnboardingSubmit(
    formData,
    setFormData,
    setMessages,
    currentStep,
    setCurrentStep,
    QUESTIONS
  );

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ content: QUESTIONS[0].message, sender: 'ai' }]);
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
          validationErrors={validationErrors}
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

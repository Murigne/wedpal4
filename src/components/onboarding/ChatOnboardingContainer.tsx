
import React, { useEffect } from 'react';
import { useChatOnboardingState } from './useChatOnboardingState';
import { useOnboardingAnimation } from './hooks/useOnboardingAnimation';
import { useChatOnboardingForm } from './hooks/useChatOnboardingForm';
import ChatOnboardingHeader from './ChatOnboardingHeader';
import ChatOnboardingWrapper from './ChatOnboardingWrapper';

const ChatOnboardingContainer: React.FC = () => {
  const {
    QUESTIONS,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    messages,
    setMessages,
    messagesEndRef,
    isTyping,
    setIsTyping,
    isCreatingAccount,
    setIsCreatingAccount
  } = useChatOnboardingState();

  const {
    showAnimation,
    setShowAnimation,
    getInitials,
    getWelcomeMessage
  } = useOnboardingAnimation();

  const {
    validationErrors,
    handleInputChange,
    handleLoginClick,
    handleSubmit
  } = useChatOnboardingForm(
    formData,
    setFormData,
    QUESTIONS,
    currentStep,
    setCurrentStep,
    messages,
    setMessages,
    setShowAnimation,
    setIsTyping,
    setIsCreatingAccount
  );

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ content: QUESTIONS[0].message as string, sender: 'ai' }]);
    }
  }, [messages, QUESTIONS, setMessages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden animated-gradient">
      <div className="wedding-card w-full max-w-md md:max-w-lg backdrop-blur-sm mb-8">
        <ChatOnboardingHeader handleLoginClick={handleLoginClick} />
        
        <ChatOnboardingWrapper
          showAnimation={showAnimation}
          getInitials={getInitials}
          getWelcomeMessage={getWelcomeMessage}
          formData={formData}
          validationErrors={validationErrors}
          messages={messages}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          currentStep={currentStep}
          QUESTIONS={QUESTIONS}
          isCreatingAccount={isCreatingAccount}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Your love story is uniquely yours. <br />
        We're here to help you plan every magical moment.
      </p>
    </div>
  );
};

export default ChatOnboardingContainer;

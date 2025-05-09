
import React from 'react';
import { ChatFormData, ValidationErrors, QuestionType } from './useChatOnboardingState';
import OnboardingChat from './OnboardingChat';
import ChatOnboardingForm from './ChatOnboardingForm';
import SparkleAnimation from '../SparkleAnimation';

interface ChatOnboardingWrapperProps {
  showAnimation: boolean;
  getInitials: (formData: ChatFormData) => string;
  getWelcomeMessage: (formData: ChatFormData) => string;
  formData: ChatFormData;
  validationErrors: ValidationErrors;
  messages: Array<{ content: string, sender: 'user' | 'ai' }>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  currentStep: number;
  QUESTIONS: QuestionType[];
  isCreatingAccount: boolean;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatOnboardingWrapper: React.FC<ChatOnboardingWrapperProps> = ({
  showAnimation,
  getInitials,
  getWelcomeMessage,
  formData,
  validationErrors,
  messages,
  handleInputChange,
  handleSubmit,
  currentStep,
  QUESTIONS,
  isCreatingAccount,
  isTyping,
  messagesEndRef
}) => {
  return (
    <>
      <OnboardingChat messages={messages} />
      
      {showAnimation && (
        <SparkleAnimation 
          initials={getInitials(formData)}
          welcomeMessage={getWelcomeMessage(formData)}
        />
      )}
      
      {!showAnimation && (
        <ChatOnboardingForm
          currentStep={currentStep}
          formData={formData}
          validationErrors={validationErrors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          QUESTIONS={QUESTIONS}
          isCreatingAccount={isCreatingAccount}
          isTyping={isTyping}
        />
      )}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatOnboardingWrapper;

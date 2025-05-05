
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { QuestionType, ChatFormData } from './useChatOnboardingState';

interface ChatOnboardingFormProps {
  currentStep: number;
  formData: ChatFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  QUESTIONS: QuestionType[];
  isCreatingAccount: boolean;
  isTyping: boolean;
}

const ChatOnboardingForm: React.FC<ChatOnboardingFormProps> = ({
  currentStep,
  formData,
  handleInputChange,
  handleSubmit,
  QUESTIONS,
  isCreatingAccount,
  isTyping
}) => {
  const currentQuestion = QUESTIONS[currentStep];
  const placeholders = Array.isArray(currentQuestion.placeholder)
    ? currentQuestion.placeholder
    : [currentQuestion.placeholder];

  if (isCreatingAccount) {
    return (
      <div className="text-center py-4">
        <div className="animate-pulse">Creating your wedding account...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {currentStep === 0 ? (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {QUESTIONS[currentStep].icon}
            </div>
            <input
              type="text"
              name="partner1Name"
              value={formData.partner1Name}
              onChange={handleInputChange}
              placeholder={placeholders[0]}
              required
              className="wedding-input pl-10 w-full"
            />
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {QUESTIONS[currentStep].icon}
            </div>
            <input
              type="text"
              name="partner2Name"
              value={formData.partner2Name}
              onChange={handleInputChange}
              placeholder={placeholders[1] || ""}
              required
              className="wedding-input pl-10 w-full"
            />
          </div>
        </div>
      ) : currentStep === QUESTIONS.length - 1 ? (
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {QUESTIONS[currentStep].icon}
          </div>
          <input
            type="password"
            name={Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field}
            value={formData[Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field]}
            onChange={handleInputChange}
            placeholder={placeholders[0]}
            required
            className="wedding-input pl-10 w-full"
          />
        </div>
      ) : currentStep === QUESTIONS.length - 2 ? (
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {QUESTIONS[currentStep].icon}
          </div>
          <input
            type="email"
            name={Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field}
            value={formData[Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field]}
            onChange={handleInputChange}
            placeholder={placeholders[0]}
            required
            className="wedding-input pl-10 w-full"
          />
        </div>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {QUESTIONS[currentStep].icon}
          </div>
          <input
            type="text"
            name={Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field}
            value={formData[Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field]}
            onChange={handleInputChange}
            placeholder={placeholders[0]}
            required
            className="wedding-input pl-10 w-full"
          />
        </div>
      )}
      
      <Button type="submit" className="wedding-button w-full" disabled={isCreatingAccount}>
        {isCreatingAccount ? "Creating Account..." : (isTyping ? "Thinking..." : "Send")}
        {!isCreatingAccount && !isTyping && <ArrowRight className="w-4 h-4 ml-1" />}
      </Button>
    </form>
  );
};

export default ChatOnboardingForm;


import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { QuestionType, ChatFormData, ValidationErrors } from './useChatOnboardingState';

interface ChatOnboardingFormProps {
  currentStep: number;
  formData: ChatFormData;
  validationErrors: ValidationErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  QUESTIONS: QuestionType[];
  isCreatingAccount: boolean;
  isTyping: boolean;
}

const ChatOnboardingForm: React.FC<ChatOnboardingFormProps> = ({
  currentStep,
  formData,
  validationErrors,
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
              className={`wedding-input pl-10 w-full ${validationErrors.partner1Name ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {validationErrors.partner1Name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.partner1Name}</p>
            )}
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
              className={`wedding-input pl-10 w-full ${validationErrors.partner2Name ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {validationErrors.partner2Name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.partner2Name}</p>
            )}
          </div>
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
            className={`wedding-input pl-10 w-full ${validationErrors[Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field] ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {validationErrors[Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field] && (
            <p className="text-red-500 text-sm mt-1">{validationErrors[Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field]}</p>
          )}
        </div>
      )}
      
      <Button type="submit" className="wedding-button w-full" disabled={isCreatingAccount || isTyping}>
        {isCreatingAccount ? "Creating Account..." : (isTyping ? "Thinking..." : "Send")}
        {!isCreatingAccount && !isTyping && <ArrowRight className="w-4 h-4 ml-1" />}
      </Button>
    </form>
  );
};

export default ChatOnboardingForm;

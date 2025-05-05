
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FormData, ValidationErrors } from './useOnboardingState';

interface Question {
  id: string;
  message: string;
  field: string | string[];
  icon: JSX.Element;
  placeholder: string;
  validation?: (value: string) => string | undefined;
}

interface OnboardingFormProps {
  currentStep: number;
  formData: FormData;
  validationErrors: Record<string, string>; // Changed from ValidationErrors
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  QUESTIONS: Question[];
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ 
  currentStep, 
  formData, 
  validationErrors,
  setFormData, 
  handleSubmit,
  QUESTIONS 
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const currentQuestion = QUESTIONS[currentStep];
  const isFirstQuestion = Array.isArray(currentQuestion.field);
  
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
              placeholder="Your name"
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
              placeholder="Partner's name"
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
            name={QUESTIONS[currentStep].field as string}
            value={formData[QUESTIONS[currentStep].field as keyof FormData]}
            onChange={handleInputChange}
            placeholder={QUESTIONS[currentStep].placeholder}
            required
            className={`wedding-input pl-10 w-full ${validationErrors[QUESTIONS[currentStep].field as string] ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {validationErrors[QUESTIONS[currentStep].field as string] && (
            <p className="text-red-500 text-sm mt-1">{validationErrors[QUESTIONS[currentStep].field as string]}</p>
          )}
        </div>
      )}
      
      <Button type="submit" className="wedding-button w-full">
        {currentStep < QUESTIONS.length - 1 ? "Continue" : "Create My Wedding Plan"}
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </form>
  );
};

export default OnboardingForm;


import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FormData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  budget: string;
  theme: string;
  guestCount: string;
}

interface Question {
  id: string;
  message: string;
  field: string | string[];
  icon: JSX.Element;
  placeholder: string;
}

interface OnboardingFormProps {
  currentStep: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  QUESTIONS: Question[];
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ 
  currentStep, 
  formData, 
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
              placeholder="Partner's name"
              required
              className="wedding-input pl-10 w-full"
            />
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
            className="wedding-input pl-10 w-full"
          />
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

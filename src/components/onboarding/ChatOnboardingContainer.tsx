
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '../AuthProvider';
import SparkleAnimation from '../SparkleAnimation';
import { useChatOnboardingState } from './useChatOnboardingState';
import OnboardingChat from './OnboardingChat';
import ChatOnboardingForm from './ChatOnboardingForm';

const ChatOnboardingContainer: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    QUESTIONS,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    validationErrors,
    setValidationErrors,
    messages,
    setMessages,
    showAnimation,
    setShowAnimation,
    messagesEndRef,
    isTyping,
    setIsTyping,
    isCreatingAccount,
    setIsCreatingAccount,
    error,
    setError
  } = useChatOnboardingState();

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ content: QUESTIONS[0].message as string, sender: 'ai' }]);
    }
    scrollToBottom();
  }, [messages, QUESTIONS]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const createAccount = async () => {
    try {
      setIsCreatingAccount(true);
      
      console.log("Navigating to dashboard with formData:", formData);
      
      // Navigate directly to dashboard
      navigate('/dashboard', { 
        state: { 
          formData,
          userColors: [],
          isNewUser: true // Flag to indicate this is a new user coming from onboarding
        } 
      });
    } catch (err: any) {
      setError(err.message);
      setMessages(prev => [...prev, { content: `Error creating account: ${err.message}. Please try again.`, sender: 'ai' }]);
      setIsCreatingAccount(false);
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentQuestion = QUESTIONS[currentStep];
    const errors: Record<string, string> = {};
    let isValid = true;

    if (Array.isArray(currentQuestion.field)) {
      // Handle first step with two fields
      const field1 = currentQuestion.field[0];
      const field2 = currentQuestion.field[1];
      
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
      const field = Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field;
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the current step
    if (!validateCurrentStep()) return;
    
    const question = QUESTIONS[currentStep];
    let userResponse = '';
    
    if (Array.isArray(question.field)) {
      userResponse = `${formData[question.field[0]]} & ${formData[question.field[1]]}`;
    } else {
      userResponse = formData[question.field];
    }
    
    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);
    
    if (currentStep === 0) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        moveToNextQuestion();
      }, 8000);
    } else if (currentStep === QUESTIONS.length - 1) {
      // Final question (wedding colors) answered - go straight to dashboard
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          content: "Thanks for all your information! Creating your personalized dashboard...", 
          sender: 'ai' 
        }]);
        
        toast({
          title: "Welcome to your wedding dashboard!",
          description: "We've created your personalized wedding experience.",
          duration: 3000,
        });
        
        createAccount();
      }, 500);
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        
        const nextQuestion = QUESTIONS[currentStep + 1];
        const messageContent = typeof nextQuestion.message === 'function' 
          ? nextQuestion.message(formData) 
          : nextQuestion.message;
          
        setMessages(prev => [...prev, { content: messageContent, sender: 'ai' }]);
        setIsTyping(false);
      }, 500);
    }
  };

  const getInitials = () => {
    const p1Initial = formData.partner1Name ? formData.partner1Name.charAt(0).toUpperCase() : '';
    const p2Initial = formData.partner2Name ? formData.partner2Name.charAt(0).toUpperCase() : '';
    return `${p1Initial} & ${p2Initial}`;
  };

  const getWelcomeMessage = () => {
    return `${formData.partner1Name}, ${formData.partner2Name} – we are excited about this beautiful journey you are about to embark on. As you answer the next series of questions, we hope we can bring your dream wedding to life.`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden animated-gradient">
      <div className="wedding-card w-full max-w-md md:max-w-lg backdrop-blur-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-foreground">
            Forever <span className="text-wedding-pink-dark">Together</span>
          </h1>
          
          <Button onClick={handleLoginClick} variant="outline" size="sm" className="flex items-center gap-1">
            <User size={16} />
            Login
          </Button>
        </div>
        
        <OnboardingChat messages={messages} />
        
        {showAnimation && (
          <SparkleAnimation 
            initials={getInitials()}
            welcomeMessage={getWelcomeMessage()}
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
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Your love story is uniquely yours. <br />
        We're here to help you plan every magical moment.
      </p>
    </div>
  );
};

export default ChatOnboardingContainer;

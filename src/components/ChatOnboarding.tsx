
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Coins, Palette, Users, Plane, Home, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatMessage from './ChatMessage';
import { supabase } from '@/integrations/supabase/client';
import SparkleAnimation from './SparkleAnimation';
import { toast } from '@/hooks/use-toast';

interface FormData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  budget: string;
  theme: string;
  guestCount: string;
  honeymoonDestination: string;
  needNewHome: string;
  email: string;
  password: string;
}

const QUESTIONS = [
  {
    id: 'welcome',
    message: "Hi there! 💕 I'm your AI wedding planner. Let's start planning your dream wedding together! What are your names?",
    field: ['partner1Name', 'partner2Name'],
    icon: <Calendar className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: ["Your name", "Partner's name"]
  },
  {
    id: 'date',
    message: "That's wonderful! When are you thinking of having your special day?",
    field: 'weddingDate',
    icon: <Calendar className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "MM/DD/YYYY"
  },
  {
    id: 'budget',
    message: "Great! Now, what budget range are you considering for your wedding?",
    field: 'budget',
    icon: <Coins className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "e.g., $10,000 - $20,000"
  },
  {
    id: 'theme',
    message: "What theme or style are you envisioning for your wedding? (Colors, indoor/outdoor, etc.)",
    field: 'theme',
    icon: <Palette className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "e.g., Rustic outdoor with sage green & blush"
  },
  {
    id: 'guests',
    message: "How many guests are you planning to invite?",
    field: 'guestCount',
    icon: <Users className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "e.g., 50, 100, 150+"
  },
  {
    id: 'honeymoon',
    message: "Do you have a dream honeymoon destination in mind?",
    field: 'honeymoonDestination',
    icon: <Plane className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "e.g., Bali, Italy, Maldives"
  },
  {
    id: 'home',
    message: "Are you planning to move into a new home after the wedding?",
    field: 'needNewHome',
    icon: <Home className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "Yes / No / Already have one"
  },
  {
    id: 'email',
    message: "Finally, what's your email address?",
    field: 'email',
    icon: <Mail className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "your.email@example.com"
  },
  {
    id: 'password',
    message: (formData: FormData) => `Create a password as strong as your love for ${formData.partner2Name}`,
    field: 'password',
    icon: <Lock className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "Enter your password",
    isPassword: true
  }
];

const ChatOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    partner1Name: '',
    partner2Name: '',
    weddingDate: '',
    budget: '',
    theme: '',
    guestCount: '',
    honeymoonDestination: '',
    needNewHome: '',
    email: '',
    password: '',
  });
  const [messages, setMessages] = useState<Array<{ content: string; sender: 'ai' | 'user' }>>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Add the initial AI message when component mounts
    if (messages.length === 0) {
      setMessages([{ content: QUESTIONS[0].message, sender: 'ai' }]);
    }
    
    // Scroll to bottom of messages
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const question = QUESTIONS[currentStep];
    let userResponse = '';
    
    if (Array.isArray(question.field)) {
      userResponse = `${formData[question.field[0] as keyof FormData]} & ${formData[question.field[1] as keyof FormData]}`;
    } else {
      // Mask password in chat
      userResponse = question.field === 'password' ? '••••••••' : formData[question.field as keyof FormData];
    }
    
    // Add user's response to messages
    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);
    
    // If this is the first question (names), show the special animation after submitting
    if (currentStep === 0) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        moveToNextQuestion();
      }, 3000); // Reduced animation time from 8s to 3s
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    // Move to next question or finish
    if (currentStep < QUESTIONS.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        const nextQuestion = QUESTIONS[currentStep + 1];
        const questionContent = typeof nextQuestion.message === 'function' 
          ? nextQuestion.message(formData) 
          : nextQuestion.message;
        
        setMessages(prev => [...prev, { content: questionContent, sender: 'ai' }]);
        setIsTyping(false);
      }, 500); // Reduced typing delay from 1000ms to 500ms
    } else {
      // All questions answered, create account and proceed to dashboard
      createUserAccount();
    }
  };

  const createUserAccount = async () => {
    setIsLoading(true);
    
    try {
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            partner1_name: formData.partner1Name,
            partner2_name: formData.partner2Name,
          }
        }
      });
      
      if (error) throw error;
      
      // Save wedding details to database
      if (data.user) {
        await saveWeddingDetails(data.user.id);
      }
      
      // Show success message
      toast({
        title: "Account Created!",
        description: "Welcome to your wedding planning journey!",
        duration: 5000,
      });
      
      // Navigate to dashboard
      navigate('/dashboard', { state: { formData } });
      
    } catch (error: any) {
      console.error('Account creation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  const saveWeddingDetails = async (userId: string) => {
    try {
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
          honeymoon_destination: formData.honeymoonDestination,
          need_new_home: formData.needNewHome,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving wedding details:', error);
      // We continue anyway as this can be fixed later
    }
  };

  // Get welcome message for animation
  const getWelcomeMessage = () => {
    return `${formData.partner1Name}, ${formData.partner2Name} – we are excited about this beautiful journey you are about to embark on. As you answer the next series of questions, we hope we can bring your dream wedding to life.`;
  };

  // Get initials for animation
  const getInitials = () => {
    const p1Initial = formData.partner1Name ? formData.partner1Name.charAt(0).toUpperCase() : '';
    const p2Initial = formData.partner2Name ? formData.partner2Name.charAt(0).toUpperCase() : '';
    return `${p1Initial} & ${p2Initial}`;
  };

  const currentQuestion = QUESTIONS[currentStep];
  // Fix for type error: Ensure that placeholder is always treated as an array when needed
  const placeholders = Array.isArray(currentQuestion.placeholder) 
    ? currentQuestion.placeholder 
    : [currentQuestion.placeholder];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden animated-gradient">
      <div className="wedding-card w-full max-w-md md:max-w-lg backdrop-blur-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-foreground">
            Forever <span className="text-wedding-pink-dark">Together</span>
          </h1>
        </div>
        
        {/* Chat messages container */}
        <div className="bg-white/70 rounded-lg p-3 mb-4 h-[400px] overflow-y-auto shadow-inner">
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                content={msg.content}
                sender={msg.sender}
              />
            ))}
            
            {isTyping && (
              <div className="chat-bubble-ai typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Magical animation overlay */}
        {showAnimation && (
          <SparkleAnimation 
            initials={getInitials()}
            welcomeMessage={getWelcomeMessage()}
          />
        )}
        
        {/* Input form */}
        {!showAnimation && !isLoading && (
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
            ) : (
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {QUESTIONS[currentStep].icon}
                </div>
                <input
                  type={currentQuestion.isPassword ? "password" : "text"}
                  name={Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field}
                  value={formData[Array.isArray(currentQuestion.field) ? currentQuestion.field[0] as keyof FormData : currentQuestion.field as keyof FormData]}
                  onChange={handleInputChange}
                  placeholder={placeholders[0]}
                  required
                  className="wedding-input pl-10 w-full"
                />
              </div>
            )}
            
            <Button type="submit" className="wedding-button w-full" disabled={isLoading}>
              {isLoading ? "Creating your account..." : isTyping ? "Thinking..." : "Send"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        )}
        
        {isLoading && (
          <div className="text-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-pink-800">Creating your wedding planning account...</p>
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Your love story is uniquely yours. <br />
        We're here to help you plan every magical moment.
      </p>
    </div>
  );
};

export default ChatOnboarding;

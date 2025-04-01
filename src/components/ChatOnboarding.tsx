
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Coins, Palette, Users, Plane, Home, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatMessage from './ChatMessage';
import { useAuth } from './AuthProvider';
import SparkleAnimation from './SparkleAnimation';
import { supabase } from '@/integrations/supabase/client';

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

interface QuestionType {
  id: string;
  message: string | ((formData: FormData) => string);
  field: keyof FormData | Array<keyof FormData>;
  icon: JSX.Element;
  placeholder: string | string[];
}

const QUESTIONS: QuestionType[] = [
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
    message: "Final question! Are you planning to move into a new home after the wedding?",
    field: 'needNewHome',
    icon: <Home className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "Yes / No / Already have one"
  },
  {
    id: 'email',
    message: "Finally, what's your email address?",
    field: 'email',
    icon: <Mail className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "yourname@example.com"
  },
  {
    id: 'password',
    message: (formData) => `Create a password as strong as your love for ${formData.partner2Name}`,
    field: 'password',
    icon: <Lock className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "Your strong password"
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isTyping, setIsTyping] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Add the initial AI message when component mounts
    if (messages.length === 0) {
      setMessages([{ content: QUESTIONS[0].message as string, sender: 'ai' }]);
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

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const createAccount = async () => {
    try {
      setIsCreatingAccount(true);
      
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) throw error;
      
      if (data && data.user) {
        // Add wedding details to the database
        const { error: profileError } = await supabase
          .from('wedding_profiles')
          .insert([
            {
              user_id: data.user.id,
              partner1_name: formData.partner1Name,
              partner2_name: formData.partner2Name,
              wedding_date: formData.weddingDate,
              budget: formData.budget,
              theme: formData.theme,
              guest_count: formData.guestCount,
              honeymoon_destination: formData.honeymoonDestination,
              need_new_home: formData.needNewHome,
            },
          ]);
          
        if (profileError) throw profileError;
        
        // Redirect to dashboard with wedding data
        navigate('/dashboard', { state: { formData } });
      }
    } catch (err: any) {
      setError(err.message);
      // Add error message to chat
      setMessages(prev => [...prev, { content: `Error creating account: ${err.message}. Please try again.`, sender: 'ai' }]);
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const question = QUESTIONS[currentStep];
    let userResponse = '';
    
    if (Array.isArray(question.field)) {
      userResponse = `${formData[question.field[0]]} & ${formData[question.field[1]]}`;
    } else {
      userResponse = formData[question.field];
    }
    
    // Add user's response to messages
    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);
    
    // If this is the first question (names), show the special animation after submitting
    if (currentStep === 0) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        moveToNextQuestion();
      }, 8000); // Animation + message display time
    } else if (currentStep === QUESTIONS.length - 1) {
      // Last question (password) - create account
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          content: "Thanks for all your information! Creating your account now...", 
          sender: 'ai' 
        }]);
        createAccount();
      }, 500); // Reduced typing delay
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
        
        // Get the next message content
        const nextQuestion = QUESTIONS[currentStep + 1];
        const messageContent = typeof nextQuestion.message === 'function' 
          ? nextQuestion.message(formData) 
          : nextQuestion.message;
          
        setMessages(prev => [...prev, { content: messageContent, sender: 'ai' }]);
        setIsTyping(false);
      }, 500); // Reduced typing delay
    }
  };

  // Get initials for animation
  const getInitials = () => {
    const p1Initial = formData.partner1Name ? formData.partner1Name.charAt(0).toUpperCase() : '';
    const p2Initial = formData.partner2Name ? formData.partner2Name.charAt(0).toUpperCase() : '';
    return `${p1Initial} & ${p2Initial}`;
  };

  // Get welcome message for animation
  const getWelcomeMessage = () => {
    return `${formData.partner1Name}, ${formData.partner2Name} – we are excited about this beautiful journey you are about to embark on. As you answer the next series of questions, we hope we can bring your dream wedding to life.`;
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
          
          <Button onClick={handleLoginClick} variant="outline" size="sm" className="flex items-center gap-1">
            <User size={16} />
            Login
          </Button>
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
        {!showAnimation && !isCreatingAccount && (
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
        )}
        
        {isCreatingAccount && (
          <div className="text-center py-4">
            <div className="animate-pulse">Creating your wedding account...</div>
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

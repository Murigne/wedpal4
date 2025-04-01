
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Coins, Palette, Users, Plane, Home, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatMessage from './ChatMessage';
import { useAuth } from './AuthProvider';
import SparkleAnimation from './SparkleAnimation';
import { supabase } from '@/integrations/supabase/client';
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
}

interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
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
    message: "Final question! Are you planning to move into a new home after the wedding?",
    field: 'needNewHome',
    icon: <Home className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "Yes / No / Already have one"
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
  });
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [messages, setMessages] = useState<Array<{ content: string; sender: 'ai' | 'user' }>>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Add the initial AI message when component mounts
    if (messages.length === 0) {
      setMessages([{ content: QUESTIONS[0].message, sender: 'ai' }]);
    }
    
    // Scroll to bottom of messages
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard', { state: { formData } });
    }
  }, [user, navigate, formData]);

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

  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const question = QUESTIONS[currentStep];
    let userResponse = '';
    
    if (Array.isArray(question.field)) {
      userResponse = `${formData[question.field[0] as keyof FormData]} & ${formData[question.field[1] as keyof FormData]}`;
    } else {
      userResponse = formData[question.field as keyof FormData];
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
        setMessages(prev => [...prev, { content: QUESTIONS[currentStep + 1].message, sender: 'ai' }]);
        setIsTyping(false);
      }, 1000); // Simulating typing delay
    } else {
      // All questions answered, show sign up form
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          content: "Thank you for sharing your wedding plans! Let's create your account so you can access your personalized dashboard.", 
          sender: 'ai' 
        }]);
        setShowSignUp(true);
      }, 1000);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            partner1_name: formData.partner1Name,
            partner2_name: formData.partner2Name,
          }
        }
      });
      
      if (error) throw error;
      
      // Save wedding details
      await saveWeddingDetails(signUpData.email);
      
      toast({
        title: "Success",
        description: "Account created! Please check your email for verification.",
        variant: "default",
      });
      
      // Navigate to auth page after signup
      navigate('/auth', { state: { formData, isSignUp: true } });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveWeddingDetails = async (email: string) => {
    try {
      // Get the user ID from the email (this is a workaround since we don't have the user ID yet)
      const { data: userData } = await supabase
        .from('wedding_details')
        .insert({
          partner1_name: formData.partner1Name,
          partner2_name: formData.partner2Name,
          wedding_date: formData.weddingDate,
          budget: formData.budget,
          theme: formData.theme,
          guest_count: formData.guestCount,
          honeymoon_destination: formData.honeymoonDestination,
          need_new_home: formData.needNewHome,
          updated_at: new Date().toISOString(),
          // The user_id will be updated later when the user logs in
          user_id: '00000000-0000-0000-0000-000000000000',
        })
        .select();
        
      if (!userData) {
        console.error('Failed to save wedding details');
      }
    } catch (error) {
      console.error('Error saving wedding details:', error);
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
        
        {/* Input form for questions */}
        {!showAnimation && !showSignUp && (
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
                  type="text"
                  name={Array.isArray(currentQuestion.field) ? currentQuestion.field[0] : currentQuestion.field}
                  value={formData[Array.isArray(currentQuestion.field) ? currentQuestion.field[0] as keyof FormData : currentQuestion.field as keyof FormData]}
                  onChange={handleInputChange}
                  placeholder={placeholders[0]}
                  required
                  className="wedding-input pl-10 w-full"
                />
              </div>
            )}
            
            <Button type="submit" className="wedding-button w-full">
              {isTyping ? "Thinking..." : "Send"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        )}
        
        {/* Sign Up Form */}
        {!showAnimation && showSignUp && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-wedding-pink-dark" />
              </div>
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpInputChange}
                placeholder="Email Address"
                required
                className="wedding-input pl-10 w-full"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-wedding-pink-dark" />
              </div>
              <input
                type="password"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpInputChange}
                placeholder="Password"
                required
                className="wedding-input pl-10 w-full"
                minLength={6}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-wedding-pink-dark" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleSignUpInputChange}
                placeholder="Confirm Password"
                required
                className="wedding-input pl-10 w-full"
                minLength={6}
              />
            </div>
            
            <Button type="submit" className="wedding-button w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center mt-2 text-sm text-muted-foreground">
              Already have an account? <button type="button" onClick={handleLoginClick} className="text-wedding-pink-dark hover:underline">Log In</button>
            </div>
          </form>
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

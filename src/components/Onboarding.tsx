
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, Coins, Palette, Users, Plane, Home, ArrowRight } from 'lucide-react';
import ChatMessage from './ChatMessage';
import FloatingHearts from './FloatingHearts';
import { Button } from '@/components/ui/button';

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

const QUESTIONS = [
  {
    id: 'welcome',
    message: "Hi there! 💕 I'm your AI wedding planner. Let's start planning your dream wedding together! What are your names?",
    field: ['partner1Name', 'partner2Name'],
    icon: <Heart className="w-5 h-5 text-wedding-pink-dark" />,
    placeholder: "Partner 1's name & Partner 2's name"
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

const Onboarding: React.FC = () => {
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
  const [messages, setMessages] = useState<Array<{ content: string; sender: 'ai' | 'user' }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Move to next question or finish
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setMessages(prev => [...prev, { content: QUESTIONS[currentStep + 1].message, sender: 'ai' }]);
      }, 500);
    } else {
      // All questions answered, proceed to dashboard
      setTimeout(() => {
        navigate('/dashboard', { state: { formData } });
      }, 1000);
    }
  };

  const currentQuestion = QUESTIONS[currentStep];
  const isFirstQuestion = Array.isArray(currentQuestion.field);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts count={15} />
      
      <div className="wedding-card w-full max-w-md md:max-w-lg backdrop-blur-sm mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          Forever <span className="text-wedding-pink-dark">Together</span>
        </h1>
        
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
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isFirstQuestion ? (
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {currentQuestion.icon}
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
                  {currentQuestion.icon}
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
                {currentQuestion.icon}
              </div>
              <input
                type="text"
                name={currentQuestion.field as string}
                value={formData[currentQuestion.field as keyof FormData]}
                onChange={handleInputChange}
                placeholder={currentQuestion.placeholder}
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
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Your love story is uniquely yours. <br />
        We're here to help you plan every magical moment.
      </p>
    </div>
  );
};

export default Onboarding;

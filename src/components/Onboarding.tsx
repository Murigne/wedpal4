
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, Coins, Palette, Users, Plane, Home, ArrowRight, User } from 'lucide-react';
import ChatMessage from './ChatMessage';
import FloatingHearts from './FloatingHearts';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type WeddingDetails = Database['public']['Tables']['wedding_details']['Row'];

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
  const { user } = useAuth();
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ content: QUESTIONS[0].message, sender: 'ai' }]);
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchWeddingDetails = async () => {
      if (!user) {
        setIsFetchingData(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            setIsFetchingData(false);
            return;
          }
          throw error;
        }

        if (data) {
          setFormData({
            partner1Name: data.partner1_name || '',
            partner2Name: data.partner2_name || '',
            weddingDate: data.wedding_date || '',
            budget: data.budget || '',
            theme: data.theme || '',
            guestCount: data.guest_count || '',
            honeymoonDestination: data.honeymoon_destination || '',
            needNewHome: data.need_new_home || '',
          });
          
          navigate('/dashboard', { state: { formData: {
            partner1Name: data.partner1_name || '',
            partner2Name: data.partner2_name || '',
            weddingDate: data.wedding_date || '',
            budget: data.budget || '',
            theme: data.theme || '',
            guestCount: data.guest_count || '',
            honeymoonDestination: data.honeymoon_destination || '',
            needNewHome: data.need_new_home || '',
          } } });
        }
      } catch (error: any) {
        console.error('Error fetching wedding details:', error);
        toast({
          title: "Error",
          description: "Failed to load your saved wedding details",
          variant: "destructive",
        });
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchWeddingDetails();
  }, [user, navigate]);

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
    navigate('/login');
  };

  const saveDataToSupabase = async () => {
    if (!user) {
      navigate('/signup', { 
        state: { 
          formData,
          userColors: [] // Ensure we're passing userColors even if it's empty
        } 
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('wedding_details')
        .upsert({
          user_id: user.id,
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
      toast({
        title: "Success",
        description: "Your wedding details have been saved!",
        variant: "default",
      });
    } catch (error: any) {
      console.error('Error saving wedding details:', error);
      toast({
        title: "Error", 
        description: "Failed to save your wedding details",
        variant: "destructive",
      });
    }
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
    
    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);
    
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setMessages(prev => [...prev, { content: QUESTIONS[currentStep + 1].message, sender: 'ai' }]);
      }, 500);
    } else {
      await saveDataToSupabase();
      
      setTimeout(() => {
        navigate('/dashboard', { state: { formData } });
      }, 1000);
    }
  };

  if (isFetchingData) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient">
        <div className="wedding-card p-8 text-center">
          <p>Loading your wedding details...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];
  const isFirstQuestion = Array.isArray(currentQuestion.field);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden animated-gradient">
      <FloatingHearts count={15} />
      
      <div className="wedding-card w-full max-w-md md:max-w-lg backdrop-blur-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-foreground">
            Forever <span className="text-wedding-pink-dark">Together</span>
          </h1>
          
          {!user && (
            <Button onClick={handleLoginClick} variant="outline" size="sm" className="flex items-center gap-1">
              <User size={16} />
              Login
            </Button>
          )}
        </div>
        
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
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Your love story is uniquely yours. <br />
        We're here to help you plan every magical moment.
      </p>
    </div>
  );
};

export default Onboarding;

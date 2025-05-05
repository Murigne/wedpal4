
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../AuthProvider';
import OnboardingChat from './OnboardingChat';
import OnboardingForm from './OnboardingForm';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useOnboardingState } from './useOnboardingState';
import FloatingHearts from '../FloatingHearts';

const OnboardingContainer: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFetchingData, setIsFetchingData] = useState(true);
  const { 
    formData, 
    setFormData, 
    currentStep, 
    setCurrentStep, 
    messages, 
    setMessages, 
    QUESTIONS,
    validationErrors,
    setValidationErrors 
  } = useOnboardingState();

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
          });
          
          navigate('/dashboard', { state: { formData: {
            partner1Name: data.partner1_name || '',
            partner2Name: data.partner2_name || '',
            weddingDate: data.wedding_date || '',
            budget: data.budget || '',
            theme: data.theme || '',
            guestCount: data.guest_count || '',
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
  }, [user, navigate, setFormData]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const saveDataToSupabase = async () => {
    if (!user) {
      // Navigate directly to dashboard for non-authenticated users
      console.log("User not authenticated, navigating to dashboard with formData:", formData);
      navigate('/dashboard', { 
        state: { 
          formData,
          userColors: [],
          isNewUser: true // Flag to indicate this is a new user coming from onboarding
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
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) throw error;
      toast({
        title: "Success",
        description: "Your wedding details have been saved!",
        variant: "default",
      });
      
      navigate('/dashboard', { 
        state: { 
          formData,
          userColors: [],
          isNewUser: true
        } 
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

  const validateCurrentStep = (): boolean => {
    const currentQuestion = QUESTIONS[currentStep];
    const errors: Record<string, string> = {};
    let isValid = true;

    if (Array.isArray(currentQuestion.field)) {
      // Handle first step with two fields
      const field1 = currentQuestion.field[0] as keyof typeof formData;
      const field2 = currentQuestion.field[1] as keyof typeof formData;
      
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
      const field = currentQuestion.field as keyof typeof formData;
      
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the current step
    if (!validateCurrentStep()) return;
    
    const question = QUESTIONS[currentStep];
    let userResponse = '';
    
    if (Array.isArray(question.field)) {
      userResponse = `${formData[question.field[0] as keyof typeof formData]} & ${formData[question.field[1] as keyof typeof formData]}`;
    } else {
      userResponse = formData[question.field as keyof typeof formData];
    }
    
    setMessages(prev => [...prev, { content: userResponse, sender: 'user' }]);
    
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setMessages(prev => [...prev, { content: QUESTIONS[currentStep + 1].message, sender: 'ai' }]);
      }, 500);
    } else {
      // Final question answered - go to dashboard directly
      // Add a final message before navigating
      setMessages(prev => [...prev, { 
        content: "Thanks for all your information! Creating your personalized dashboard...", 
        sender: 'ai' 
      }]);
      
      // Use an async function inside the setTimeout to handle asynchronous operations
      setTimeout(() => {
        const navigateToDashboard = async () => {
          await saveDataToSupabase();
        };
        navigateToDashboard();
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
        
        <OnboardingChat 
          messages={messages} 
        />
        
        <OnboardingForm 
          currentStep={currentStep}
          formData={formData}
          validationErrors={validationErrors}
          setFormData={setFormData}
          handleSubmit={handleFormSubmit}
          QUESTIONS={QUESTIONS}
        />
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Your love story is uniquely yours. <br />
        We're here to help you plan every magical moment.
      </p>
    </div>
  );
};

export default OnboardingContainer;

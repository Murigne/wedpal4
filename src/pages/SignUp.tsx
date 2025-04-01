
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import WedPalLogo from '@/components/WedPalLogo';
import HeartAnimation from '@/components/HeartAnimation';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      // If we have form data from onboarding, save it
      if (formData) {
        await saveUserData();
      }
      
      toast({
        title: "Success",
        description: "Sign up successful! Please check your email for verification.",
        variant: "default",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const saveUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !formData) return;
    
    try {
      const { error } = await supabase
        .from('wedding_details')
        .upsert({
          user_id: session.user.id,
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
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden animated-gradient">
      {/* WedPal Logo */}
      <div className="absolute top-6 left-8 z-10">
        <WedPalLogo className="drop-shadow-lg" />
      </div>
      
      <HeartAnimation />
      
      <div className="wedding-card w-full max-w-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          Create Your <span className="text-wedding-pink-dark">Wedding Account</span>
        </h1>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-wedding-pink-dark" />
            </div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="wedding-input pl-10 w-full"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-wedding-pink-dark" />
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="wedding-input pl-10 w-full"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-wedding-pink-dark" />
            </div>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="wedding-input pl-10 w-full"
            />
          </div>
          
          <Button type="submit" className="wedding-button w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          
          <div className="text-center mt-4">
            <button 
              type="button" 
              className="text-sm text-muted-foreground hover:text-wedding-pink-dark"
              onClick={handleLoginClick}
            >
              Already have an account? Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
